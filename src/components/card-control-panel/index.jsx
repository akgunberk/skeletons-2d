import {
  Box,
  ButtonGroup,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";

export default function CardControlPanel({
  skeleton,
  animations,
  setWalk,
  changeSkeleton,
}) {
  const handleChange = (event) => {
    const skeletonName = event.target.value.toLowerCase().split(" ").join("");
    setWalk(false);
    changeSkeleton(skeletonName);
  };

  const changeAnimation = (event) => {
    skeleton.changeAnimation(event.target.value);
  };

  return (
    <Grid sm={9} md={3} container item justify="space-around">
      <Grid xs={12} item>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Skeleton</InputLabel>
          <Select
            labelId="skeleton-select-label"
            id="skeleton-select"
            onChange={handleChange}
            defaultValue="powerup"
          >
            <MenuItem value={"powerup"}>Power Up </MenuItem>
            <MenuItem value={"spineboy"}>SpineBoy</MenuItem>
          </Select>
        </FormControl>
        <Box height={50} width={10} />
      </Grid>

      <Grid xs={6} item>
        {animations?.length > 0 && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Animations</InputLabel>
            <Select
              labelId="skeleton-select-label"
              id="skeleton-select"
              onChange={changeAnimation}
            >
              {animations.map((animation, index) => (
                <MenuItem key={index} value={animation.name}>
                  {animation.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid xs={4} item>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="outlined primary button group"
        >
          <IconButton onClick={() => setWalk(true)}>
            <PlayCircleFilledWhiteIcon />
          </IconButton>
          <IconButton onClick={() => setWalk(false)}>
            <PauseCircleFilledIcon />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
