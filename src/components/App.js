import React from 'react'
import PropTypes from 'prop-types'
import Amplify from 'aws-amplify'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from '../theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from './Header'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { IntlProvider } from "react-intl"
import { chooseLocale } from '../locations'
import ItemList from '../containers/ItemList'
import Cart from './Cart'
import { makeStyles } from '@material-ui/core/styles'


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
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  spaceOfToolbar: {
    height: theme.mixins.toolbar.minHeight,
  }
}));

//<Route exact path="/login" render={() => <Authenticator />} />
const App = ({locale, fetchCartData, fetchAllCategories}) => {
  const classes = useStyles();

  React.useEffect(() => {
    fetchCartData()
    fetchAllCategories()
  })

  return (
    <IntlProvider locale={locale} messages={chooseLocale(locale)}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className={classes.root}>
            <CssBaseline />
            
            <Route exact path="/" render={() => {
              return (
                <React.Fragment>
                  <Header />
                  <div className={classes.content}>
                    <div className={classes.spaceOfToolbar} />
                    <ItemList />
                  </div>
                </React.Fragment>
              )
            }} />

            <Route exact path="/cart" render={() => {
              return (
                <div className={classes.content}>
                  <div className={classes.spaceOfToolbar} />
                  <Cart />
                </div>
              )
            }} />
          </div>
        </Router>
      </MuiThemeProvider>
    </IntlProvider>
  )
}

App.propTypes = {
  locale: PropTypes.string.isRequired,
  fetchCartData: PropTypes.func,
  fetchAllCategories: PropTypes.func,
}

export default App
