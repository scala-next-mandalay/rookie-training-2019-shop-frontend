import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';

const IconLinkButton = ({children, className,onClick, color='inherit'}) => {
  return (
    <IconButton
      color={color}
      // to={to}
      // component={RouterLink}
      className={className}
      onClick={onClick}
    >
      {children}
    </IconButton>
  );
};

IconLinkButton.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};

export default IconLinkButton;