import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { evaluate } from "mathjs";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "20px 10px",
    marginTop: "10px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "orange",
    color: "#fff"
  },
  container: {
    backgroundColor: "#333"
  },
  calculatorOutput: {
    padding: "5px",
    fontSize: "40px",
    fontWeight: "bold",
    textAlign: "right",
    backgroundColor: "#333",
    color: "#fff"
  }
}));

const ButtonGrid = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.calculatorOutput} value={props.value}>
            {props.value}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick("AC");
            }}
          >
            AC
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper 
            className={classes.paper}
            onClick={() => {
              props.onClick("+/-");
            }}
          >
            +/-
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>%</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick("/");
            }}
          >
            /
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(7);
            }}
          >
            7
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(8);
            }}
          >
            8
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(9);
            }}
          >
            9
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick("*");
            }}
          >
            *
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(4);
            }}
          >
            4
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(5);
            }}
          >
            5
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(6);
            }}
          >
            6
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick("-");
            }}
          >
            -
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(1);
            }}
          >
            1
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(2);
            }}
          >
            2
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(3);
            }}
          >
            3
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick("+");
            }}
          >
            +
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(0);
            }}
          >
            0
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick(".");
            }}
          >
            .
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            className={classes.paper}
            onClick={() => {
              props.onClick("=");
            }}
          >
            =
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const BaseContainer = () => {
  const classes = useStyles();
  const [output, setOutput] = useState([0]);
  const [flag, setFlag] = useState(false);
  const [operator, setOperator] = useState([]);

  const storeOperator = (value) => {
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      setOperator((prevVal) => [...prevVal, value]);
    }
  };

  const validateOperator = (val) => {
    return ["+","-","/","*"].includes(val);
  }

  const buttonClick = (value) => {
    storeOperator(value);

    if (value === "AC") {
      setOutput([0]);
      setFlag(false);
      setOperator([]);
      return;
    }
  
    if (value === "=") {
      setOutput((prevVal) => {
        if (prevVal[0] === 0) {
          return [0];
        } else {
          const secondToLastVal = prevVal.substring(prevVal.length - 2, prevVal.length - 1);
          const lastVal = prevVal.substring(prevVal.length - 1, prevVal.length);

          if (validateOperator(secondToLastVal) && validateOperator(lastVal)) {
            return [prevVal.substring(0, prevVal.length - 2)];
          } else if(validateOperator(lastVal)) {
            return [prevVal.substring(0, prevVal.length - 1)];
          } else {
            try{
              return [evaluate(prevVal)];
            } catch(e) {
              return "Invalid expression";
            }
          }
        }
      });
      setOperator([]);
    } else if (value === "+/-") {
      setOutput((prevVal) => {
        if (prevVal[0] === 0) {
          return [0];
        } else {
          const outputOperator =  prevVal.replace(/[0-9]/g,'');
        
          if (!outputOperator.length) {
            return `-${output}`;
          } else { 
            const lastOperator = outputOperator.slice(-1);
            const secondLastOperator = outputOperator.slice(-2,-1);

            if (lastOperator === "*" || lastOperator === "/") {
              return output.replace(outputOperator,`${outputOperator}-`);
            } else {
              let negateValue = "";
              if (secondLastOperator === "*" || secondLastOperator === "/" || secondLastOperator === "") {
                negateValue = lastOperator === "+" ? "-" : "";
              } else {
                negateValue = lastOperator === "+" ? "-" : "+";
              }

              return output.replace(lastOperator, negateValue);
            }
          } 
        }
      });
      
    } else {
      if (!flag) {
        setOutput([value].join(''));
        setFlag(true);
      } else {
        setOutput((prevClick) => {
          return [...prevClick, value].join('');
        });
      }
    }
  };

  if (operator.length  === 2) {
    setOutput((prevVal) => {
          const secondToLastValue = prevVal.substring(
            prevVal.length - 2,
            prevVal.length - 1
          );
          const lastValue = prevVal.substring(
            prevVal.length - 1,
            prevVal.length
          );
          
          if (validateOperator(secondToLastValue) && validateOperator(lastValue)) {
            setOperator([secondToLastValue]);
            return prevVal;
          } else {
            const val = evaluate(prevVal.substring(0, prevVal.length - 1));
            setOperator([lastValue]);
            return [val,lastValue].join('');
          } 
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" className={classes.container}>
        <ButtonGrid onClick={buttonClick} value={output} />
      </Container>
    </React.Fragment>
  );
};

const Calculator = () => {
  return <BaseContainer />;
};

export default Calculator;
