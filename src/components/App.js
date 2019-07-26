import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from "react-intl";
import { chooseLocale } from '../locations';
import Shop from './Shop';
import Checkout from '../containers/Checkout';
import OrderSuccess from '../containers/OrderSuccess';
import OrderHistory from '../containers/OrderHistory';
import OrderDetail from '../containers/OrderDetail';


const App = ({locale, fetchCartData, fetchAllCategories, setUser,fetchAllOrders,fetchAllOrdersItem}) => {
  React.useEffect(() => {
    fetchCartData();
    fetchAllCategories();
    fetchAllOrders();
    fetchAllOrdersItem();
  });

  return (
    <IntlProvider locale={locale} messages={chooseLocale(locale)}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Route exact path="/" render={() => {
            return <Shop />;
          }} />
          
          <Route exact path="/checkout" render={() => {
            return <Checkout />;
            
          }} />
          <Route exact path="/checkoutconfirm" render={() => {
            return <OrderSuccess/>;
            
          }} />
          <Route exact path="/orderhistory" render={() => {
              return <OrderHistory />;
            }} />
             <Route exact path="/orderdetail" render={() => {
              return <OrderDetail />;
            }} />
            </Router>
      </MuiThemeProvider>
    </IntlProvider>
  );
};

App.propTypes = {
  locale: PropTypes.string.isRequired,
  fetchCartData: PropTypes.func,
  fetchAllCategories: PropTypes.func,
  fetchAllOrders: PropTypes.func,
  fetchAllOrdersItem: PropTypes.func,

};

export default App;
