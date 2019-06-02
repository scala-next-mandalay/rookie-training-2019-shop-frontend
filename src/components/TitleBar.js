import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {FormattedMessage} from 'react-intl'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge';
import { Link as RouterLink } from 'react-router-dom';


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

const TitleBar = ({cart, totalQuantity, handleDrawerToggle}) => {
  const classes = useStyles()
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          hidden={(handleDrawerToggle === null)}
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
  )
}

TitleBar.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  totalQuantity: PropTypes.number.isRequired,
  handleDrawerToggle: PropTypes,
}

TitleBar.defaultProps = {
  handleDrawerToggle: null,
}

export default TitleBar