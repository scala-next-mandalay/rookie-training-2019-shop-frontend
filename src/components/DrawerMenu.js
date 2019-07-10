import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Box, Drawer, Hidden, IconButton, Divider } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import CategoryList from '../containers/CategoryList'
// import ToolbarSpacer from './ToolbarSpacer'

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  // drawer: {
  //   [theme.breakpoints.up('xs')]: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //   },
  // },
}));

const DrawerMenu = ({mobileOpen, handleDrawerClose}) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="css">
        <Drawer
           variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Box width={drawerWidth}>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <CategoryList handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Hidden>

      
    </nav>
  )
}

DrawerMenu.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired
}

export default DrawerMenu