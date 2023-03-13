import { Box, Paper, Stack, Switch, Typography, TextField } from '@mui/material';

function Payee(props: any) {
  const styles = {
    item: {
      width: "240px",
      height: "30px",
      padding: "10px",
      backgroundColor: "#fdfdfd",
      boxShadow: "none",
    },
    stack: {
      width: "230px",
      padding: "5px",
      justifyContent: "space-between",
      alignItems: "center",
    },
    name: {
      width: "94%",
      fontSize: "16px",
    },
    switch: {
      opacity: props.equality ? 1 : 0,
      width: 48,
      height: 30,
      padding: 0,
      backgroundColor: 'pink',
      borderRadius: 24 / 2,
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: "3px",
        '&.Mui-checked': {
          color: '#fff',
          margin: "3px",
          transform: 'translateX(18px)',
          '& .MuiSwitch-thumb:before': {
            backgroundColor: 'lightblue',
            borderRadius: 24 / 2,
            content: "'M'",
          },
          '& + .MuiSwitch-track': {
            opacity: 1,
          },
        },
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: 'pink',
        width: 24,
        height: 24,
        '&:before': {
          alignItems: "flex-end",
          content: "'F'",
          display: "flex",
          fontWeight: "bold",
          justifyContent: "center",
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
      }
    }
  }

  return (
    <Box>
      <Paper className="centered" sx={styles.item}>
        <Stack className="centered" direction="row" sx={styles.stack}>
          <TextField
            variant="standard"
            placeholder={props.payees[props.index].name}
            InputProps={{
              endAdornment: <Switch
                sx={styles.switch}
                defaultChecked={props.payees[props.index].gender == "m"}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  props.payees[props.index].gender = event.target.checked ? "m" : "f";
                  props.splitAmounts(props.amount, props.equality);
                  props.setPayees([...props.payees]);
                }}
              />,
              disableUnderline: true,
              sx: styles.name
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.payees[props.index].name = event.target.value;
              props.setPayees([...props.payees]);
            }}
          ></TextField>
          <Typography textAlign={"right"} minWidth={"3.5em"} fontSize={16} fontWeight="bold">{`${String(props.payees[props.index].amount).slice(0, -2) || "0"}.${String(props.payees[props.index].amount).slice(-2, -1) || "0"}${String(props.payees[props.index].amount).slice(-1) || "0"}`}</Typography>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Payee
