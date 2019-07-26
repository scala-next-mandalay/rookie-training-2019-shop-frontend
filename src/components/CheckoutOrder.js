import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BASEURL_ITEM_IMAGES } from '../constants';
import { Grid, Box, CardMedia, Paper, Divider, Hidden } from '@material-ui/core';
import QuantitySelect from '../containers/QuantitySelect';
import DeleteCartItemLink from '../containers/DeleteCartItemLink';


const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  descImagePC: {
    width: 70,
    height: 100
  },
  menu: {
    width: 200,
  },
}));

const CheckoutOrder = ({ cart, totalPrice,totalQuantity}) => {
  console.log(cart);
  const classes = useStyles();
  const mobileView = [];
  const pcView = [];
  const Netprice = () => (
    <Box display="flex" mt={2} pl={3} pb={3}>
      <Grid item xs={false} sm={4}>
        <Box> </Box>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Box>TOTAL QUANTITY(Items</Box>
        <Box> SUBTOTAL </Box>
        <Box>SALES TAX(0%)</Box>
        <Box>TOTAL</Box>
      </Grid>
      <Grid item xs={6} sm={4} >
        <Box textAlign="right" pr={3}>{totalQuantity} (Items)</Box>
        <Box textAlign="right" pr={3}> {totalPrice} MMK </Box>
        <Box textAlign="right" pr={3}> 0.0 MMK </Box>
        <Box textAlign="right" pr={3}> {totalPrice} MMK</Box>
      </Grid>
    </Box>
  );
  cart.forEach((cartList, k) => {
    pcView.push(
      <Grid container key={cartList.id}>
        <Box flexGrow={1} display="flex">
          <Grid item xs={3}>
            <Box textAlign="left" my={2} pl={3}>
              <CardMedia
                className={classes.descImagePC}
                image={BASEURL_ITEM_IMAGES + cartList.image}
                title={cartList.name}
              />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box textAlign="left" my={2} fontWeight="100" className="nameTxt">
              {cartList.name}
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box textAlign="left" my={2} >
              <QuantitySelect id={cartList.id} quantity={cartList.quantity} />
                        </Box>
          </Grid>
        </Box>
        <Grid item xs={2}>
          <Box textAlign="right" my={2} pr={3}>
            <Box pb={2}>({cartList.quantity}x{cartList.price})</Box>
            <Box> {cartList.subTotal} </Box>
            <Box><DeleteCartItemLink id={cartList.id}/></Box>
          </Box>
        </Grid>
        <Grid item xs={12}><Divider /></Grid>
      </Grid>
    );
  });
  cart.forEach((cartList, k) => {
    mobileView.push(
      <Grid container key={cartList.id}>
        <Box flexGrow={1} display="flex">
          <Grid item xs={6}>
            <Box textAlign="left" my={2} pl={3}>
              <CardMedia
                className={classes.descImagePC}
                image={BASEURL_ITEM_IMAGES + cartList.image}
                title={cartList.name}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="right" my={2} pr={3} fontWeight="fontWeightBold">
              {cartList.name}
            </Box>
            <Box textAlign="right" my={2} pr={3} >
              {cartList.quantity}x {cartList.price}MMK
                        </Box>
            <Box textAlign="right" my={2} pr={3}>
              {cartList.subTotal} MMK
                        </Box>
                         <Box textAlign="right" my={2} pr={3}>
                        <DeleteCartItemLink id={cartList.id}/>
                        </Box>
          </Grid>
        </Box>
        <Grid item xs={12}><Divider /></Grid>
      </Grid>
    );
  });
  return (
    <Paper>
      <Hidden xsDown>
        <Grid key={0} container>
          <Box flexGrow={1} display="flex" >
            <Grid item xs={3} >
              <Box textAlign="left" my={2} pl={3}>PRODUCT</Box>
            </Grid>
            <Grid item xs={3}>
              <Box textAlign="left" my={2} xs={3} >DESCRIPTION</Box>
            </Grid>
            <Grid item xs={2}>
              <Box textAlign="left" my={2} xs={3}>QUANTITY</Box>
            </Grid>
          </Box>
          <Grid item xs={2}>
            <Box textAlign="right" my={2} pr={3} xs={3}>PRICE</Box>
          </Grid>
          <Grid item xs={12}><Divider /></Grid>
        </Grid>
        {pcView}
      </Hidden>
      <Hidden smUp>
        {mobileView}
      </Hidden>
      <Netprice />
    </Paper>
  );
};
export default CheckoutOrder;
