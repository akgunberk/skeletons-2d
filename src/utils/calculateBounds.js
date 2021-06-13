import { spine } from "../spine/spine-canvas";

export default function calculateBounds(skeleton) {
  skeleton.setToSetupPose();
  skeleton.updateWorldTransform();
  const offset = new spine.Vector2();
  const size = new spine.Vector2();
  skeleton.getBounds(offset, size, []);
  return { offset, size };
}
