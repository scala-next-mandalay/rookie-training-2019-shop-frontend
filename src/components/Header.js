import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {FormattedMessage} from 'react-intl'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  spaceOfToolbar: {
    height: theme.mixins.toolbar.minHeight,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(3),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  rightIcon: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  }
}));

const Header = ({setCategoryId, fetchAllCategories, categories, cart, totalQuantity}) => {
  fetchAllCategories()

  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleDrawerClose = () => {
    setMobileOpen(false)
  }

  const drawer = (
    <div>
      <List>
        {categories.map((obj) => (
          <ListItem button key={obj.id} onClick={()=>{
            handleDrawerClose()
            setCategoryId(obj.id)
          }}  >
            <ListItemText>
            <Typography variant="h6" noWrap>
              {obj.name}
            </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <React.Fragment>
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
         <FormattedMessage id="Top.Title" />
        </Typography>

        <IconButton
          color="inherit"
          to="/cart"
          component={RouterLink}
          className={classes.rightIcon}
        >
          <Badge 
            color="secondary" 
            badgeContent={totalQuantity} 
            invisible={cart.length > 0 ? false: true} 
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
    
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div>
            <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
            </IconButton>
          </div>
          {drawer}
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.spaceOfToolbar} />
          {drawer}
        </Drawer> 
      </Hidden>
    </nav>
    </React.Fragment>
  )
}

export default Header