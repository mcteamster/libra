import { useState } from 'react'
import { Box, Button, Paper, Stack, Typography, TextField, InputAdornment } from '@mui/material';
import Payee from './Payee';
import BalanceIcon from '@mui/icons-material/Balance';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PaidIcon from '@mui/icons-material/Paid';
import names from "../data/names.json";

function Split(props: any) {
  const [equality, setEquality] = useState(true); // Equality mode
  const [amount, setAmount] = useState(10000); // Amount to split in cents
  const [payees, setPayees] = useState([
    { key: 0, name: names[Math.floor(Math.random() * names.length)], gender: "f", amount: 0 },
    { key: 1, name: names[Math.floor(Math.random() * names.length)], gender: "m", amount: 0 }
  ]) // Randomly guessing gender is fairer than assuming?

  const splitAmounts = (amount: number, equality: boolean) => {
    const femalePayees = payees.filter((payee) => payee.gender == "f");
    const malePayees = payees.filter((payee) => payee.gender == "m");

    // Calculate quota based on the current paygap statistics
    const paygap = equality ? props.rate : 0;
    const quota = malePayees.length + (1 - paygap) * femalePayees.length;

    // Divide whole cents fairly
    const femaleAmount = Math.floor((1 - paygap) * Number(amount) / quota);
    let maleAmount = Math.floor(Number(amount) / quota);

    // Allocate
    malePayees.forEach((payee) => payee.amount = maleAmount)
    femalePayees.forEach((payee) => payee.amount = femaleAmount)

    // Distribute the extra cents in order 
    let remainderCents = amount - malePayees.length * maleAmount - femalePayees.length * femaleAmount;
    while (remainderCents > 0) {
      payees.forEach((payee) => {
        if (remainderCents > 0) {
          payee.amount++;
          remainderCents--;
        }
      })
    }
  };
  splitAmounts(amount, equality)

  const styles = {
    box: {
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexDirection: "column",
      paddingTop: "30px",
    },
    prompt: {
      textAlign: "left",
      lineHeight: "66px",
    },
    entry: {
      fontSize: "50px",
      width: "260px",
    },
    payeeBox: {
      maxHeight: "325px",
      overflowY: "scroll",
    },
    buttons: {
      marginBottom: "30px",
      height: "40px",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "space-around",
      justifyContent: "space-around",
    },
    personButton: {
      minWidth: "32px",
      minHeight: "32px",
    },
    splitButton: {
      height: "32px",
      display: "flex",
      alignItems: "flex-start",
    },
    equalityButton: {
      height: "32px",
      display: "flex",
      alignItems: "flex-start",
    }
  }

  return (
    <Box sx={styles.box}>
      <Box>
        <Box>
          <Typography variant="h4" sx={styles.prompt}>
            let's split
          </Typography>
          <TextField
            sx={styles.entry}
            value={`${String(amount).slice(0, -2) || "0"}.${String(amount).slice(-2, -1) || "0"}${String(amount).slice(-1) || "0"}`}
            InputProps={{
              inputMode: 'numeric',
              endAdornment: <InputAdornment position="end">AUD</InputAdornment>,
              sx: styles.entry
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const amountRegex = new RegExp("^[0-9]{0,6}$")
              const amountCents = event.target.value.replace(".", "");
              if (amountCents.match(amountRegex)) {
                setAmount(Number(amountCents));
                splitAmounts(Number(amountCents), equality);
              } else {
                setAmount(amount);
              }
            }}></TextField>
          <Typography variant="h4" sx={styles.prompt}>between {payees.length}</Typography>
        </Box>
        <Stack direction="column" spacing={1}>
          <Stack className='hiddenscroll' direction="column" spacing={1} sx={styles.payeeBox}>
            {payees.reverse().map((payee) => {
              return <Payee key={payee.key} index={payee.key} payees={payees} setPayees={setPayees} amount={amount} splitAmounts={splitAmounts} equality={equality} />
            })}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              color="primary"
              sx={styles.personButton}
              onClick={() => {
                payees.push({ key: payees.length, name: names[Math.floor(Math.random() * names.length)], gender: (Math.random() > 0.5) ? "f" : "m", amount: 0 })
                splitAmounts(amount, equality)
                setPayees([...payees]);
              }}
            ><PersonAddIcon /></Button>
            <Button
              color="error"
              sx={styles.personButton}
              onClick={() => {
                payees.pop()
                splitAmounts(amount, equality)
                setPayees([...payees]);
              }}
            ><PersonRemoveIcon /></Button>
          </Stack>
        </Stack>
      </Box>
      <Box sx={styles.buttons}>
        <Button
          sx={styles.equalityButton}
          startIcon={<BalanceIcon />}
          variant={equality ? "contained" : "outlined"}
          color="primary"
          onClick={() => {
            splitAmounts(amount, !equality);
            setEquality(!equality);
            setPayees([...payees]);
          }}>
          <Typography fontSize={16} fontWeight="bold">{(100 * props.rate).toFixed(1)}%</Typography>
        </Button>
        <Button
          sx={styles.splitButton}
          variant="contained"
          color="primary"
          endIcon={<PaidIcon />}
          onClick={() => {
            props.setScreen(1);
          }}>
          <Typography fontSize={16} fontWeight="bold">SPLIT</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default Split
