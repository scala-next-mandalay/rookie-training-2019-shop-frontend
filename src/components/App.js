import React from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import theme from '../theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { IntlProvider } from "react-intl"
import { chooseLocale } from '../locations'
import Cart from './Cart'
import Shop from './Shop'

const App = ({locale, fetchCartData, fetchAllCategories, setUser}) => {
  React.useEffect(() => {
    fetchCartData()
    fetchAllCategories()
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
