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
          <Paper className={classes.paper}>+/-</Paper>
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

  const buttonClick = (value) => {
    storeOperator(value);

    if (value === "AC") {
      setOutput([0]);
      setFlag(false);
      setOperator([]);
    } else if (value === "=") {

      setOutput((prevVal) => {
        const lastVal = prevVal.substring(prevVal.length - 1, prevVal.length);
        console.log(output.length);
        if (lastVal === "+" || lastVal === "-" || lastVal === "/" || lastVal === "*") {
          return [prevVal.substring(0, prevVal.length - 1)];
        } else {
          return [evaluate(prevVal)];
        }
      });
    } else {
      if (!flag) {
        setOutput([value]);
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
          const val = evaluate(prevVal.substring(0, prevVal.length - 1));
          const lastOperator = prevVal.substring(
            prevVal.length - 1,
            prevVal.length
          );

          setOperator([lastOperator]);
          return [val,lastOperator].join('');
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
