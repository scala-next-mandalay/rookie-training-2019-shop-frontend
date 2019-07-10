import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, CardContent, CardActions, Button, Link,Divider,IconButton } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import CartTable from '../containers/CartTable'
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from '@material-ui/icons/Close';


const CartTotal = ({totalPrice}) => {
  const useStyles = makeStyles(theme => ({
   
  list: {
    width: '500px'
  },
  closebtn:{
   marginLeft: theme.spacing(2),
    flex: 1,
  }
 
}));

const classes = useStyles();
  const [state, setState] = React.useState({
    // top: false,
    // left: false,
    // bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      // role="presentation"
      // onClick={toggleDrawer(side, false)}
      // onKeyDown={toggleDrawer(side, false)}
    >
      
        <IconButton edge="start"  onClick={toggleDrawer(side, false)} aria-label="Close" className={classes.closebtn}>
              <CloseIcon />
            </IconButton>
          
        <CartTable/>
        
        <Divider />
       <Box display="flex" className="shopping_cart_style">
        <Box  ml={0} mr="auto">
          Your Shopping Cart 
        </Box>
        <Box mr={0} ml="auto" my="auto">
        Free
        </Box>
        </Box>
        <Divider/>
        <Box display="flex" className="shopping_cart_style">
        <Box  ml={0} mr="auto">
          Total Amount ( Items)
        </Box>
        <Box mr={0} ml="auto">
        {totalPrice} Ks
        </Box>
        </Box>
        <Divider/>
           <Button
            className="btn_Purchase"
            variant="contained" 
            color="primary"
            to="/checkout"
            fullWidth
            component={RouterLink}>
              SECURE CHECKOUT
            </Button>
         <Divider/>
     
    </div>
  );
  
  return (
    <Box display="flex" flexDirection="column" marginTop="20px">
    
      <Card>
        <CardContent>
          <Box mt={1} fontSize="h6.fontSize" fontWeight={600}>
            Total {totalPrice} Ks
          </Box>
        </CardContent>
        <CardActions>
          
          <Button onClick={toggleDrawer("right", true)} fullWidth={true} variant="contained" color="primary">Confirm Order</Button>
          
        </CardActions>
        <CardContent>
          <Link to="/"
            component={RouterLink}>
            Continue Shopping
          </Link>
        </CardContent>
      </Card>
       <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
      
      
      
    </Box>  
  )
}

CartTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}

export default CartTotal
