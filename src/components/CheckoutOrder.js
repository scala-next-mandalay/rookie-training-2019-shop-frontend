import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BASEURL_ITEM_IMAGES } from '../constants';
import { Grid, Box, CardMedia, Paper, Divider, Hidden,Link } from '@material-ui/core';
import QuantitySelect from '../containers/QuantitySelect';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteSharp';
import Tooltip from '@material-ui/core/Tooltip';
 import { FormattedMessage } from 'react-intl';


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
  btnRemoveItem:{
    cursor:'pointer'
  },
  iconSpace:{
     marginTop: theme.spacing(1),
     marginRight: theme.spacing(1),
  }
}));

const CheckoutOrder = ({ cart, totalPrice,totalQuantity,deleteCartItem}) => {
  const removeCartItem= (id)=>{
    deleteCartItem(id);
  };
  const classes = useStyles();
  const mobileView = [];
  const pcView = [];
  const Netprice = () => (
    <Box display="flex" mt={2} pl={3} pb={3}>
      <Grid item xs={false} sm={4}>
        <Box> </Box>
      </Grid>
      <Grid item xs={6} sm={4}>
        <Box><FormattedMessage id="Label.TotalQuantity" defualtMessage="Total Quantity" /></Box>
        <Box><FormattedMessage id="Label.SubTotal" defualtMessage="SubTotal" /> </Box>
        <Box><FormattedMessage id="Label.Tax" defualtMessage="Sales Tax" /></Box>
        <Box><FormattedMessage id="Label.TotalPrice" defualtMessage="Total Price" /></Box>
      </Grid>
      <Grid item xs={6} sm={4} className="text1">
        <Box textAlign="right" pr={3}>{totalQuantity} (Items)</Box>
        <Box textAlign="right" pr={3}> {totalPrice} MMK </Box>
        <Box textAlign="right" pr={3}> 0.0 MMK </Box>
        <Box textAlign="right" pr={3}> {totalPrice} MMK</Box>
      </Grid>
    </Box>
  );
  cart.forEach((cartList, k) => {
    pcView.push(
      <Grid container key={cartList.id} className="text2">
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
          <Box textAlign="right" my={2} mr={3}>
            <Box pb={2} mr={0}>({cartList.quantity}x{cartList.price})MMK</Box>
            <Box mr={0}> {cartList.subTotal}MMK </Box>
          <Box>  
           <Link className={classes.btnRemoveItem} onClick={()=> removeCartItem(cartList.id)} color="secondary" fontSize="10px">
           <Box mr={0}>
           <Tooltip title="Delete">
           <DeleteOutlinedIcon/>
           </Tooltip>
           </Box>
           </Link>
          </Box>
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
          <Grid item xs={6} className="text2">
            <Box textAlign="right" my={2} pr={3} fontWeight="fontWeightBold">
              {cartList.name}
            </Box>
             <Box textAlign="right" my={2} pr={3}>
             <QuantitySelect id={cartList.id} quantity={cartList.quantity} />
             </Box>
            <Box textAlign="right" my={2} pr={3} >
              {cartList.quantity}x {cartList.price}MMK
            </Box>
            <Box textAlign="right" my={2} pr={3}>
              {cartList.subTotal} MMK
            </Box>
            <Box textAlign="right" my={2} pr={3}>
              <Link className={classes.btnRemoveItem} onClick={()=> removeCartItem(cartList.id)} color="secondary" fontSize="10px">
                <Box mr={0}>
                <Tooltip title="Delete">
                <DeleteOutlinedIcon className={classes.iconSpace}/>
                </Tooltip>
                </Box>
              </Link>
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
              <Box textAlign="left" my={2} pl={3}><FormattedMessage id="Label.Product" defualtMessage="Product" /></Box>
            </Grid>
            <Grid item xs={3}>
              <Box textAlign="left" my={2} xs={3} ><FormattedMessage id="Label.Description" defualtMessage="Description" /></Box>
            </Grid>
            <Grid item xs={2}>
              <Box textAlign="left" my={2} xs={3}><FormattedMessage id="Label.Quantity" defualtMessage="Quantity" /></Box>
            </Grid>
          </Box>
          <Grid item xs={2}>
            <Box textAlign="right" my={2} pr={3} xs={3}><FormattedMessage id="Label.Price" defualtMessage="Price" /></Box>
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
