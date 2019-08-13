import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Shop from './Shop';
import Checkout from '../containers/Checkout';
import OrderSuccess from '../containers/OrderSuccess';
import OrderHistory from '../containers/OrderHistory';
import OrderDetail from '../containers/OrderDetail';
import { IntlProvider } from "react-intl";
import { chooseLocale } from '../locations';
import Login from '../containers/Login';
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);

const App = ({locale, fetchCartData, fetchAllCategories, setUser,fetchAllOrders,fetchAllOrdersItem,fetchAuthedUser, user, refreshToken}) => {
  const isFirstRef = React.useRef(true);
  React.useEffect(() => {
   if (isFirstRef.current) {
      
      isFirstRef.current = false;
      fetchAuthedUser();
     
      
    }
    fetchCartData();
    fetchAllCategories();
    fetchAllOrders();
    fetchAllOrdersItem();
    const timer = window.setInterval(() => {
      refreshToken();
    }, 600000); //after 10 minutes to call refreshToken()
    return () => { // Return callback to run on unmount.
      window.clearInterval(timer);
    };
   
    
  });


  return (
    <IntlProvider locale={locale} messages={chooseLocale(locale)}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          
          <Route exact path="/orderhistory" render={() => {
              return <OrderHistory />;
            }} />
          <Route exact path="/orderdetail" render={() => {
              return <OrderDetail />;
          }} />
          <Route exact path="/login" render={() => {
            return <Login />;
            
          }} />
          
          <Route exact path="/" render={() => {
            return <Shop />;
          }} />
          
          <Route exact path="/checkout" render={() => {
            return <Checkout />;
            
          }} />
          <Route exact path="/checkoutconfirm" render={() => {
            return <OrderSuccess/>;
            
          }} />
          
          <Route exact path="/myjwt" render={() => {
            const token = user ? user.signInUserSession.accessToken.jwtToken : null;
            return (<div>{token}</div>);
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
