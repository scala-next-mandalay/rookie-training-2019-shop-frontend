import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  pa: {
    padding: theme.spacing(3, 2),
    backgroundColor:'#9A7B66',
    height:"50px"
  },
 
}));
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);



export default function PaperSheet() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.pa}>
       
       <ThemeProvider theme={theme}>
        <Typography variant="h5" style={{ color: '#ffffff'  }}>Welcome</Typography>
       
      </ThemeProvider>
      </Paper>
    </div>
  );
}