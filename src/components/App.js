import React from 'react'
import PropTypes from 'prop-types'
import Amplify from 'aws-amplify'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from '../theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { IntlProvider } from "react-intl"
import { chooseLocale } from '../locations'
import Cart from './Cart'
import Shop from './Shop'
import Auth from './Auth'
import { withAuthenticator } from 'aws-amplify-react'
import Auth from '@aws-amplify/auth';

Amplify.configure({
  Auth: {
    region: 'ap-northeast-1', 
    userPoolId: 'ap-northeast-1_7S9k8jC4p', 
    userPoolWebClientId: '1pb850lcfbffougheq21hrqcbt', 
    identityPoolId: 'ap-northeast-1:fd0e41e7-24e1-4777-a01b-6bc05b71dee6',
  }
});

const App = ({authState, authData, locale, fetchCartData, fetchAllCategories, setUser}) => {
  React.useEffect(() => {
    fetchCartData()
    fetchAllCategories()
    console.log(authState)
    console.log(authData)
    if (authData && authData.attributes.email && authData.attributes.email_verified) {
      setUser(authData.attributes.email)
    }
  })

  return (
    <IntlProvider locale={locale} messages={chooseLocale(locale)}>
      <MuiThemeProvider theme={theme}>
        <Router>
        <CssBaseline />
        <Route exact path="/" render={() => {
          return <Shop />
        }} />

        <Route exact path="/cart" render={() => {
          return <Cart />
        }} />
    
        <Route exact path="/login" render={() => {
          return <Auth />
        }} />
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

//export default App
const signUpConfig = {
  hiddenDefaults: ['phone_number'],
  hideAllDefaults: true
}
export default withAuthenticator(App, {signUpConfig});
