import React from 'react';
import TitleBar from '../containers/TitleBar';
import DrawerMenu from './DrawerMenu';

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    //setMobileOpen(true)
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <React.Fragment>
      <TitleBar handleDrawerToggle={handleDrawerToggle} showNav={true} showMenu={true}  showIcon={true} />
      <DrawerMenu mobileOpen={mobileOpen} handleDrawerClose={handleDrawerClose} />
    </React.Fragment>
  );
};

export default Header;