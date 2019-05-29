import React from 'react'
import Amplify from 'aws-amplify';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { IntlProvider } from "react-intl";
import { chooseLocale } from '../locations'
import ItemList from '../containers/ItemList'

import { makeStyles, useTheme } from '@material-ui/core/styles'

Amplify.configure({
  Auth: {
    region: 'ap-northeast-1', 
    userPoolId: 'ap-northeast-1_7S9k8jC4p', 
    userPoolWebClientId: '1pb850lcfbffougheq21hrqcbt', 
    identityPoolId: 'ap-northeast-1:fd0e41e7-24e1-4777-a01b-6bc05b71dee6',
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

//<Route exact path="/login" render={() => <Authenticator />} />
const App = ({locale}) => {
  const classes = useStyles();
  return (
    <IntlProvider locale={locale} messages={chooseLocale(locale)}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            <Header />
            <div className={classes.content}>
              <div className={classes.toolbar} />
              <ItemList />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    </IntlProvider>
  )
}

export default App
