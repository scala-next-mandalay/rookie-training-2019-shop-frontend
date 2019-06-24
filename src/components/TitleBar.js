import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, IconButton, AppBar, Toolbar, Badge } from '@material-ui/core'
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon } from '@material-ui/icons'
import { FormattedMessage } from 'react-intl'
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

const TitleBar = ({cart, totalQuantity, handleDrawerToggle, signOut}) => {
  const classes = useStyles()
  
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

        <Box fontSize={{xs:"subtitle1", sm:"h6.fontSize"}} flexGrow={1} ml={0}>
          <FormattedMessage id="Top.Title" />
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