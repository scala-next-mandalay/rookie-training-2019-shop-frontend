import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {FormattedMessage} from 'react-intl'
import CartTable from '../containers/CartTable'
import TitleBar from '../containers/TitleBar'

const Cart = () => {
  return (
    <React.Fragment>
    <TitleBar />
    <Container maxWidth="md">
      <CartTable />
    </Container>
    </React.Fragment>
  );
}

export default Cart;
