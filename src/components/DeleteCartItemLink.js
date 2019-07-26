import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';

const DeleteCartItemLink = ({ id, deleteCartItem }) => {
  return (
    <Link onClick={()=> deleteCartItem(id)} color="secondary" fontSize="10px">
      Delete
    </Link>
  );
};

DeleteCartItemLink.propTypes = {
  id: PropTypes.number.isRequired,
  deleteCartItem: PropTypes.func.isRequired,
};

export default DeleteCartItemLink;
