import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import {FormattedMessage} from 'react-intl'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
import CartItemPropTypes from './CartItemPropTypes'
import IconLinkButton from './IconLinkButton'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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

const TitleBar = ({cart, totalQuantity, handleDrawerToggle, userId, signOut}) => {
  const classes = useStyles()
  
  const authButton = (userId === null) ? (
    <Button color="inherit" >
      Login
    </Button>
  ) : (
    <Button color="inherit" onClick={signOut}>
      Logout
    </Button>
  )
  
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          disabled={(handleDrawerToggle === null)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Box fontSize="h6.fontSize" flexGrow={1} ml={0}>
          <FormattedMessage id="Top.Title" />
        </Box>

        <Box mr={1} ml="auto">
          {authButton}
        </Box>
        

        <Box mr={0} ml="auto">
          <IconLinkButton to="/cart">
            <Badge 
              color="secondary" 
              badgeContent={totalQuantity} 
              invisible={cart.length > 0 ? false: true} 
            >
              <ShoppingCartIcon />
            </Badge>
          </IconLinkButton>
        </Box>
        
      </Toolbar>
    </AppBar>
  )
}

TitleBar.propTypes = {
  cart: PropTypes.arrayOf(CartItemPropTypes.isRequired).isRequired,
  totalQuantity: PropTypes.number.isRequired,
  handleDrawerToggle: PropTypes.func,
}

TitleBar.defaultProps = {
  handleDrawerToggle: null,
}

export default TitleBar