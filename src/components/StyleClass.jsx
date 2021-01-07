import { makeStyles } from "@material-ui/core/styles";

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
      color: "#fff",
      opacity: 0.8
    },
    container: {
      backgroundColor: "transparent"
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

  export default useStyles;