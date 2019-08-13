import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Drawer, Hidden, IconButton, Divider,Grid } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import CategoryList from '../containers/CategoryList';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
}));

const DrawerMenu = ({mobileOpen, handleDrawerClose}) => {
  const classes = useStyles();
  const theme = useTheme();

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
          <Grid container>
         
           <Grid container>
          
          <Hidden mdUp>
           <Box ml={1} mr="auto" my="auto">
             <Box fontSize={{xs:"subtitle1", sm:"h6.fontSize"}} className="title">
                <FormattedMessage id="Top.Title" defualtMessage="Title"/>
              </Box>
           </Box>
           </Hidden>
           <Hidden smDown>
           <Box ml={1} mr="auto" my="auto">
             <Box fontSize={{xs:"subtitle1", sm:"h6.fontSize"}} className="title">
               <FormattedMessage id="Label.Category" defualtMessage="Categories"/>
              </Box>
           </Box>
           </Hidden>
             <Box mr={1} ml="auto" my="auto"> 
              <IconButton onClick={handleDrawerClose}>
              <Tooltip title="close">
              <CloseIcon />
              </Tooltip>
              </IconButton>
            </Box>
          </Grid>
          
       
       
       
           
            </Grid>
          </Box>
          <Divider />
          <CategoryList handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Hidden>

      
    </nav>
  );
};

DrawerMenu.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired
};

export default DrawerMenu;