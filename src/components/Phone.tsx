import { useState } from 'react'
import Split from "./Split"
import Submit from "./Submit"
import { Box } from '@mui/material';

function Phone() {
  const [screen, setScreen] = useState(0);
  const [rate, setRate] = useState(0.133);

  const screens: any = {
    0: <Split rate={rate} setScreen={setScreen}></Split>,
    1: <Submit rate={rate} setScreen={setScreen}></Submit>
  }

  const styles = {
    casing: {
      width: "350px",
      height: "723px",
      borderRadius: "50px",
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center"
    },
    screen: {
      width: "320px",
      height: "693px",
      borderRadius: "38px",
      backgroundColor: "antiquewhite",
      color: "black"
    }
  }

  return (
    <Box className="casing centered" sx={styles.casing}>
      <Box className="screen centered" sx={styles.screen}>
        {screens[screen]}
      </Box>
    </Box>
  )
}

export default Phone
