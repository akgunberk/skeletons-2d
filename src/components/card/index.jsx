import React, { useEffect, useRef, useState } from "react";
import useSpine from "../../hooks/useSpine";
import { Grid } from "@material-ui/core";
import CardControlPanel from "../card-control-panel";
import styles from "./styles.module.scss";
import { PubSub } from "../../utils";

const SpineCard = () => {
  const canvasRef = useRef();
  const [animations, setAnimations] = useState();
  const [walk, setWalk] = useState(false);
  const [skeleton, setSkeleton] = useSpine(canvasRef);

  useEffect(() => {
    const unsubscribe = PubSub.subscribe("ANIMATIONS_LOADED", setAnimations);

    return () => unsubscribe();
  }, []);

  return (
    <Grid container spacing={6} justify="center" alignItems="center">
      <Grid xs={12} sm={9} item>
        <div className={styles.card}>
          <canvas
            className={`${styles.canvas} ${walk && styles.loopAnimation}`}
            ref={canvasRef}
            id="canvas"
          ></canvas>
        </div>
      </Grid>

      <CardControlPanel
        skeleton={skeleton}
        changeSkeleton={setSkeleton}
        animations={animations}
        setWalk={setWalk}
      />
    </Grid>
  );
};

export default SpineCard;
