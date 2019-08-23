import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton,Grid, AppBar, Toolbar,Hidden, Badge,Divider,Button,Menu, MenuItem,  ListItemIcon, ListItemText} from '@material-ui/core';
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon ,AccountBalanceWallet as LogoutIcon,
  Close as CloseIcon,MoreVert as MoreVertIcon,History as HistoryIcon,Home as HomeIcon,AccountCircle as Person
} from '@material-ui/icons';
import { FormattedMessage } from 'react-intl';
import CartItemPropTypes from './CartItemPropTypes';
import '../assets/style.css';
import { Link as RouterLink,withRouter } from 'react-router-dom';
import NavTesting from '../containers/NavTesting';
import CheckoutOrder from '../containers/CheckoutOrder';
import Drawer from "@material-ui/core/Drawer";
import Tooltip from '@material-ui/core/Tooltip';


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
  },
  navMenuList:{
    marginLeft: theme.spacing(3),
  },
   imgIcon: {
    width: 25,
    height: 25,
    borderRadius: '100%'
  },
  selected: {
    background: '#cccccc'
  },
  Icon:{
    marginLeft:theme.spacing(2),
    fontSize:'30',
    color:'#9A7B66'
    
  },

}));
const ITEM_HEIGHT = 60;
const TitleBar = ({locale,setLocale,cart, totalQuantity, handleDrawerToggle, showMenu ,showNav,showIcon, fetchAuthedUser, signOut, user, history,signIn,loading}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
   const handleLocale = (event, locale) => {
    event.preventDefault();
    setLocale(locale);
    setAnchorEl(null);
  };
  
  // const isFirstRef = React.useRef(true);
  // React.useEffect(() => {
  //   if (isFirstRef.current) {
  //     isFirstRef.current = false;
  //     fetchAuthedUser();
  //   }
  // });
  
  const handleLogout = event => {
    event.preventDefault();
    signOut();
    setAnchorEl(null);
  };
  const handleLogin = event => {
    event.preventDefault();
    history.push("/login");
    setAnchorEl(null);
  };
  const handleViewOrderHistory=event=>{
    event.preventDefault();
    history.push("/orderhistory");
    setAnchorEl(null);
    
  };

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
        <Tooltip title="Close"><CloseIcon /></Tooltip>
      </IconButton>
       </Box>
       <Box mr={2} ml="auto" my="auto" className="text2"><FormattedMessage id="Label.CartList" defualtMessage="Cart List" /></Box></Box> 
       <Divider />
        <CheckoutOrder/>
        
      
        <Button
           onClick={toggleDrawer(side, false)}
            className="btn_Purchase"
            variant="contained" 
            color="primary"
            to="/checkout"
            disabled={!cart.length}
            fullWidth
            component={RouterLink}>
            <FormattedMessage id="Button.Confirm" defualtMessage="Confirm" />
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
          className={classes.menuButton}
        >
          {showMenu ? <MenuIcon />:null}
        </IconButton>
        
        <Hidden smDown implementation="css">
          <Box fontSize={{xs:"subtitle1", sm:"h6.fontSize"}} className="title">
          <FormattedMessage id="Top.Title" defualtMessage="Title"/>
         </Box>
        </Hidden>
       
          
        
         
        <Box mr={0} ml="auto">
        <Grid container>
        
        <Box className={classes.navMenuList}>
         {showNav ? <Box m="auto"><NavTesting /></Box> : null}
        </Box>
         {showIcon ?
       
          <IconButton color="primary" 
            onClick={toggleDrawer("right", true)}
            disabled={!cart.length}>
            <Badge 
              color="secondary" 
              badgeContent={totalQuantity} 
              invisible={totalQuantity > 0 ? false: true} 
            >
             <ShoppingCartIcon />
            </Badge>
          </IconButton>
        : null}
        
         <IconButton
                aria-label="More"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="secondary"
               >
              {user?
                <Person fontSize="large"/>:
                <MoreVertIcon/>}
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                keepMounted={false}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                
                <MenuItem className={ locale === 'ja' ? classes.selected : null }  onClick={event => handleLocale(event, 'ja')}>
                   <ListItemIcon>
                    <img src="https://cdn2.iconfinder.com/data/icons/world-flags-1-1/100/Japan-512.png" className={classes.imgIcon} alt='Japanese' />
                  </ListItemIcon>
                  <ListItemText><FormattedMessage id="Menu.Japanese" defualtMessage="Japanese" /> </ListItemText>
                </MenuItem>
                
                <MenuItem className={ locale === 'en' ? classes.selected : null } onClick={event => handleLocale(event, 'en')}>
                  <ListItemIcon>
                    <img src="https://cdn3.iconfinder.com/data/icons/world-flags-circular-1/512/49-Great_Britain_United_Kingdom_UK_England_Union_Jack_country_flag_-512.png" className={classes.imgIcon} alt='English' />
                  </ListItemIcon>
                  <ListItemText> <FormattedMessage id="Menu.English" defualtMessage="English" /> </ListItemText>
                </MenuItem>
                
                
                <Divider />
                {user ? (
                <div>
                 <MenuItem  onClick={handleViewOrderHistory} >
                  <ListItemIcon>
                    <HistoryIcon  className={classes.Icon}/>
                  </ListItemIcon>
                  <ListItemText><FormattedMessage id="Menu.OrderHistory" defualtMessage="SignOrder History" /></ListItemText>
                    
                </MenuItem>
                 <MenuItem  onClick={handleLogout} >
                  <ListItemIcon>
                    <LogoutIcon  className={classes.Icon}/>
                  </ListItemIcon>
                  <ListItemText><FormattedMessage id="Menu.SingOut" defualtMessage="Sign Out" /></ListItemText>
                  </MenuItem>
                </div>
                
                ) : (
                
               <MenuItem  onClick={handleLogin} >
                  <ListItemIcon>
                  <HomeIcon  className={classes.Icon}/>
                  </ListItemIcon>
                  <ListItemText><FormattedMessage id="Menu.SingIn" defualtMessage="Sign In" /></ListItemText>
                </MenuItem>
                )}
              </Menu>
        </Grid>
        </Box>
       
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

export default withRouter(TitleBar);