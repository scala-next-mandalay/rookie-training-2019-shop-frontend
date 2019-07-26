import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, AppBar, Toolbar, Badge,Divider,Button } from '@material-ui/core';
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon } from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import CartItemPropTypes from './CartItemPropTypes';
import IconLinkButton from './IconLinkButton';
import './style.css';
import { Link as RouterLink } from 'react-router-dom';
import NavTesting from '../containers/NavTesting';
import CheckoutOrder from '../containers/CheckoutOrder';
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
     backgroundColor:'#fff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  rightIcon: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  list: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
    width :600
    },
  },
  closebtn:{
   marginLeft: theme.spacing(2),
    flex: 1,
  }
}));

const TitleBar = ({cart, totalQuantity, handleDrawerToggle, showMenu ,showNav,showIcon}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
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
    <div className={classes.list}>
       <Box display="flex">
       <Box ml={1} mr="auto" my="auto"> 
       <IconButton edge="start"  onClick={toggleDrawer(side, false)} aria-label="Close" className={classes.closebtn}>
            <CloseIcon />
       </IconButton>
       </Box>
       <Box mr={2} ml="auto" my="auto">Your Cart List </Box></Box> 
            <Divider />
        <CheckoutOrder/>
        
      
        <Button
           onClick={toggleDrawer(side, false)}
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
    <div>
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
         
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          //disabled={(handleDrawerToggle === null)}
          className={classes.menuButton}
        >
          {showMenu ? <MenuIcon />:null}
        </IconButton>

        <Box fontSize={{xs:"subtitle1", sm:"h6.fontSize"}} ml={0} display="flex" flexDirection="row" className="title">
          <FormattedMessage id="Top.Title" />
        </Box>
         <Box>
         {showNav ? <NavTesting /> : null}
        </Box>
          {showIcon ?
        <Box mr={0} ml="auto">
          <IconLinkButton color="primary" onClick={toggleDrawer("right", true)}>
            <Badge 
              color="secondary" 
              badgeContent={totalQuantity} 
              invisible={cart.length > 0 ? false: true} 
            >
              <ShoppingCartIcon />
            </Badge>
          </IconLinkButton>
        </Box>: null}
      </Toolbar>
    </AppBar>
    <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
};
TitleBar.propTypes = {
  cart: PropTypes.arrayOf(CartItemPropTypes.isRequired).isRequired,
  totalQuantity: PropTypes.number.isRequired,
  showNav: PropTypes.bool.isRequired,
  showMenu: PropTypes.bool.isRequired,
   showIcon: PropTypes.bool.isRequired,
};

export default TitleBar;