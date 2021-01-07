import React from 'react';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import StyleClass from './StyleClass';

const ButtonGrid = (props) => {
    const classes = StyleClass();
    const buttonList = ["AC", "", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "0", ".", "="].map((button, index) => (
                                    <Grid item xs={ (button ===  "0" || button === "AC") ? 6 : 3 } key={index}>
                                        { button === "" ? <Paper className={classes.paper}  >&nbsp;</Paper>
                                            : <Paper
                                                className={classes.paper}
                                                onClick={ () => (props.onClick(button)) }
                                            >
                                                { button }
                                            </Paper>
                                        }
                                        
                                    </Grid>
                                ));

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.calculatorOutput} value={props.value}>
              {props.value}
            </Paper>
          </Grid>
        { buttonList }
        </Grid>
      </div>
    );
  };

export default ButtonGrid;