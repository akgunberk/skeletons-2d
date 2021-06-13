import { spine } from "../spine/spine-canvas";
import calculateBounds from "./calculateBounds";
import resizeCanvas from "./resizeCanvas";

// Animation Factory used by useSpine hooks create canvas with skeleten and its animations
function AnimationFactory({ canvas, skeleton, callback }) {
  let skeletonInfo,
    lastFrameTime = Date.now() / 1000;
  const context = canvas.getContext("2d");
  const skeletonRenderer = new spine.canvas.SkeletonRenderer(context);
  const assetManager = new spine.canvas.AssetManager();

  assetManager.loadText("../assets/" + skeleton + ".json");
  assetManager.loadText("../assets/" + skeleton + ".atlas");
  assetManager.loadTexture("../assets/" + skeleton + ".png");

  const getPath = (path) => assetManager.get("../assets/" + path);
  const getAtlas = () => assetManager.get(`../assets/${skeleton}.atlas`);
  const getJSON = () => assetManager.get(`../assets/${skeleton}.json`);

  const loadSkeleton = () => {
    // load Texture
    const atlas = new spine.TextureAtlas(getAtlas(), getPath);
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
    const skeletonJson = new spine.SkeletonJson(atlasLoader);
    const skeletonData = skeletonJson.readSkeletonData(getJSON());

    const skeleton = new spine.Skeleton(skeletonData);
    skeleton.scaleY = -1;
    const bounds = calculateBounds(skeleton);

    // Create an AnimationState, and set the initial animation in looping mode.
    const stateData = new spine.AnimationStateData(skeleton.data);
    const state = new spine.AnimationState(stateData);

    skeletonInfo = { skeleton, state, bounds, stateData };
    state.addListener({
      start: () => callback(skeleton.data.animations),
    });

    const defaultAnimation = skeleton.data.animations[0].name;
    state.setAnimation(0, defaultAnimation, true);

    // Pack everything up and return to caller.
    return skeletonInfo;
  };

  const setContextProps = () => {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = "#CC8A8A";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
  };

  const updateDelta = () => {
    const now = Date.now() / 1000;
    const delta = now - lastFrameTime;
    lastFrameTime = now;
    skeletonInfo.state.update(delta);
  };

  const render = () => {
    const { skeleton, state, bounds } = skeletonInfo;

    updateDelta();
    resizeCanvas({ canvas, context, bounds });
    setContextProps();

    state.apply(skeleton);
    skeleton.updateWorldTransform();
    skeletonRenderer.draw(skeleton);

    requestAnimationFrame(render);
  };

  // prevent rendering till assets loaded
  const load = () => {
    if (assetManager.hasErrors()) return;

    if (assetManager.isLoadingComplete()) {
      loadSkeleton();
      requestAnimationFrame(render);
    } else {
      requestAnimationFrame(load);
    }
  };

  // start animation loading
  requestAnimationFrame(load);

  return {
    // skin or other animation state methods can be added here
    changeAnimation: (animation) =>
      skeletonInfo.state.setAnimation(0, animation, true),
  };
}

export default AnimationFactory;
