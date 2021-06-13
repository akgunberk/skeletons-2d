import { useEffect, useState } from "react";
import AnimationFactory from "../utils/animation-factory";

const useSpine = (ref, callback) => {
  const [spine, setSpine] = useState();
  const [skeleton, setSkeleton] = useState("powerup");

  useEffect(() => {
    const animation = AnimationFactory({
      canvas: ref.current,
      skeleton,
      callback,
    });
    setSpine(animation);
  }, [skeleton]);

  return [spine, setSkeleton];
};

export default useSpine;
