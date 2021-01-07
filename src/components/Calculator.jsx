import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { evaluate } from "mathjs";
import ButtonGrid from './ButtonGrid';
import StyleClass from './StyleClass';

const Calculator = () => {
  const classes = StyleClass();
  const [output, setOutput] = useState([0]);
  const [flag, setFlag] = useState(false);
  const [operator, setOperator] = useState([]);

  const storeOperator = (value) => {
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      setOperator((prevVal) => [...prevVal, value]);
    }
  };

  const validateOperator = (val) => ( ["+","-","/","*"].includes(val) ); 

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
            return `-${prevVal}`;
          } else { 
            const lastOperator = outputOperator.slice(-1);
            const secondLastOperator = outputOperator.slice(-2,-1);
            
            if (lastOperator === "*" || lastOperator === "/") {
              console.log(output.replace(outputOperator,"what"));
              console.log(outputOperator,`${outputOperator}-`);
              return prevVal.replace(outputOperator,`${outputOperator}-`);
            } else {
              let negateValue = "";
              if (secondLastOperator === "*" || secondLastOperator === "/" || secondLastOperator === "") {
                negateValue = lastOperator === "+" ? "-" : "";
              } else {
                negateValue = lastOperator === "+" ? "-" : "+";
              }
              return prevVal.replace(lastOperator, negateValue);
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

export default Calculator;
