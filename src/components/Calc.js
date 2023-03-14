import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import MouseOverPopover from './PopList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Row = ({ items, xs, md, handlePress }) => {
  return items.map(item => (
    <Grid item xs={xs} md={md} key={item}>
      <Item><Button sx={{ width: "100%" }} onClick={() => handlePress(item)}>{item}</Button></Item>
    </Grid>
  ))
}

const MemRow = ({ items, xs, md, handlePress, mem = [] }) => {
  return items.map(item => (
    <Grid item xs={xs} md={md} key={item.name}>
      <Item>
        {item.name !== 'mem' && <Button sx={{ width: "100%" }} disabled={!item.enabled} onClick={() => handlePress(item.name)}>{item.name}</Button>}
        {item.name === 'mem' && <MouseOverPopover item={item} handleClick={() => handlePress(item.name)} mem={mem} />}
      </Item>
    </Grid>
  ))
}

const Output = ({ output: { label, evaluation, errorText, hasError }, exprText, inputRef }) => {

  return (
    <Grid item xs={6} md={12}>
      <TextField
        error={hasError}
        id="error-text"
        label={label}
        value={evaluation}
        helperText={errorText}
        sx={{ width: "100%", input: { textAlign: "right" } }}
        inputRef={inputRef}
        onChange={() => { }}
      />
    </Grid>
  )
}

function App() {

  const [output, setOutput] = React.useState({
    label: '',
    evaluation: '',
    hasError: false,
    errorText: ''
  });

  const [mem, setMem] = React.useState([])

  const inputRef = React.useRef();
  const leftOperand = React.useRef();
  const rightOperand = React.useRef();
  const opSymbol = React.useRef();

  function handlePress(text) {
    if (/\d+(\.\d+)?/.test(text)) {
      if (!opSymbol.current.value) {
        leftOperand.current.value = leftOperand.current.value.concat(text);
      }
      else {
        rightOperand.current.value = rightOperand.current.value.concat(text);
      }
    }
    if (text === '+/-') {
      if (!opSymbol.current.value) {
        let left = leftOperand.current.value;
        leftOperand.current.value = 0 - Number(left);
      }
      else {
        let right = rightOperand.current.value;
        rightOperand.current.value = 0 - Number(right);
      }
    }
    if (['+', '-', '*', '/'].includes(text)) {
      opSymbol.current.value = text;
    }
    if (['inv', 'sqr', 'sqrt'].includes(text)) {
      if (text === 'inv') {
        if (!opSymbol.current.value) {
          let left = leftOperand.current.value;
          leftOperand.current.value = 1 / Number(left);
        }
        else {
          let right = rightOperand.current.value;
          rightOperand.current.value = 1 / Number(right);
        }
      }
      else if (text === 'sqr') {
        if (!opSymbol.current.value) {
          let left = leftOperand.current.value;
          leftOperand.current.value = Number(left) * Number(left);
        }
        else {
          let right = rightOperand.current.value;
          rightOperand.current.value = Number(right) * Number(right);
        }
      }
      else if (text === 'sqrt') {
        if (!opSymbol.current.value) {
          let left = leftOperand.current.value;
          leftOperand.current.value = Math.sqrt(Number(left));
        }
        else {
          let right = rightOperand.current.value;
          rightOperand.current.value = Math.sqrt(Number(right));
        }
      }
    }
    if (['%', 'ce', 'c', 'back'].includes(text)) {
      if (text === '%') {
        if (!opSymbol.current.value) {
          let left = leftOperand.current.value;
          leftOperand.current.value = Number(left) / 100;
        }
        else {
          let right = rightOperand.current.value;
          rightOperand.current.value = Number(right) / 100;
        }
      }
      else if (text === 'c') {
        leftOperand.current.value = '';
        rightOperand.current.value = '';
        opSymbol.current.value = '';
        evaluate();
      }
      else if (text === 'ce') {
        if (!opSymbol.current.value) {
          leftOperand.current.value = '';
        }
        else {
          rightOperand.current.value = '';
        }
      }
      else if (text === 'back') {
        if (!opSymbol.current.value) {
          let left = leftOperand.current.value;
          leftOperand.current.value = left.length > 0 && left.substring(0, left.length - 1);
        }
        else {
          let right = rightOperand.current.value;
          rightOperand.current.value = right.length > 0 && right.substring(0, right.length - 1);;
        }
      }
    }
    if (['mc', 'mr', 'm+', 'm-', 'ms', 'mem'].includes(text)) {
      if (text === 'mc') {
        //memory store
        setMem(m => ([]));
        leftOperand.current.value = '';
      }
      if (text === 'ms') {
        //memory store
        setMem(m => ([leftOperand.current.value, ...mem]));
        leftOperand.current.value = '';
      }
      else if (text === 'mr') {
        //recall latest item in memory
        let left = mem[0];
        setOutput(out => ({ ...out, evaluation: left }));
        leftOperand.current.value = left;
      }
      else if (text === 'm+') {
        //add operand to latest item in memory
        let top = mem[0] || '0'
        let current = leftOperand.current.value;
        let result = Number(top) + Number(current);
        setMem([result, ...mem.slice(1)]);
        setOutput(out => ({ ...out, evaluation: result }));
        leftOperand.current.value = '';
      }
      else if (text === 'm-') {
        //subtract operand from latest item in memory
        let top = mem[0] || '0'
        let current = leftOperand.current.value;
        let result = Number(top) - Number(current);
        setMem([result, ...mem.slice(1)]);
        setOutput(out => ({ ...out, evaluation: result }));
        leftOperand.current.value = '';
      }
    }
    if (text === "=") {
      evaluate();
    }
    else {
      //update and display expression before evaluation
      setOutput(out => ({ ...out, label: exprAsString() }));
    }
  }

  function exprAsString() {
    return [leftOperand.current.value, opSymbol.current.value, rightOperand.current.value].join(" ")
  }

  function evaluate() {
    var op = opSymbol.current.value;
    var left = leftOperand.current.value;
    var right = rightOperand.current.value;
    var evaluation = left;
    if (op === '+') {
      evaluation = Number(left) + Number(right);
    }
    if (op === '-') {
      evaluation = Number(left) - Number(right);
    }
    if (op === '/') {
      evaluation = Number(left) / Number(right);
    }
    if (op === '*') {
      evaluation = Number(left) * Number(right);
    }
    setOutput(out => ({ ...out, hasError: false, errorText: '', evaluation }));
    leftOperand.current.value = evaluation;
    rightOperand.current.value = '';
    opSymbol.current.value = '';
  }

  return (
    <Container maxWidth="sm" sx={{ alignContent: "center" }}>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={6} md={12}>
          <Typography component={"h2"} variant={"h3"} sx={{ textAlign: "center" }}>Standard</Typography>
        </Grid>
        <Output exprText={'some'} output={output} inputRef={inputRef} />
        <input id="leftOperand" type={"number"} defaultValue={''} ref={leftOperand} style={{ display: "none" }} />
        <input id="rightOperand" type={"number"} defaultValue={''} ref={rightOperand} style={{ display: "none" }} />
        <input id="opSymbol" type={"text"} defaultValue={''} ref={opSymbol} style={{ display: "none" }} />
        <MemRow items={[{ name: 'mc', enabled: mem.length > 0 }, { name: 'mr', enabled: mem.length > 0 }, { name: 'm+', enabled: true }, { name: 'm-', enabled: true }, { name: 'ms', enabled: true }, { name: 'mem', enabled: mem.length > 0 }]} xs={6} md={2} handlePress={handlePress} mem={mem} />
        <Row items={['%', 'ce', 'c', 'back']} xs={6} md={3} handlePress={handlePress} />
        <Row items={['inv', 'sqr', 'sqrt', '/']} xs={6} md={3} handlePress={handlePress} />
        <Row items={['7', '8', '9', '*']} xs={6} md={3} handlePress={handlePress} />
        <Row items={['4', '5', '6', '-']} xs={6} md={3} handlePress={handlePress} />
        <Row items={['1', '2', '3', '+']} xs={6} md={3} handlePress={handlePress} />
        <Row items={['+/-', '0', '.', '=']} xs={6} md={3} handlePress={handlePress} />
      </Grid>
    </Container>
  )
}

export default App;
