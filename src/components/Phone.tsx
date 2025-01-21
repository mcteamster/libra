import { useState } from 'react'
import useMediaQuery from "../hooks/useMediaQuery";
import Split from "./Split"
import Submit from "./Submit"
import { Box } from '@mui/material';

function Phone() {
  const [screen, setScreen] = useState(0);
  const [rate, _] = useState(0.115);
  const isDesktop = useMediaQuery('(min-aspect-ratio: 2/3)');

  const screens: any = {
    0: <Split rate={rate} setScreen={setScreen}></Split>,
    1: <Submit rate={rate} setScreen={setScreen}></Submit>
  }

  const styles = {
    casing: (isDesktop: boolean) => ({
      width: isDesktop ? "350px" : "100%",
      height: isDesktop ? "723px" : "100%",
      borderRadius: isDesktop ? "50px" : "0",
      marginBottom: isDesktop ? "1em" : "0",
      backgroundColor: isDesktop ? "black" : "none",
      display: "flex",
      justifyContent: "center"
    }),
    screen: (isDesktop: boolean) => ({
      width: isDesktop ? "320px" : "100%",
      height: isDesktop ? "693px" : "100%",
      paddingBottom: isDesktop ? "0" : "1em",
      borderRadius: isDesktop ? "38px" : "0",
      backgroundColor: "antiquewhite",
      color: "black"
    })
  }

  const fetchRate = () => {
    // Try fetch this from https://www.abs.gov.au/statistics/understanding-statistics/guide-labour-statistics/gender-pay-gap-guide
    // let currentRate;
    // setRate(currentRate);
  }

  return (
    <Box className="casing centered" sx={styles.casing(isDesktop)}>
      <Box className="screen centered" sx={styles.screen(isDesktop)}>
        {screens[screen]}
      </Box>
    </Box>
  )
}

export default Phone
