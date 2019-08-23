import React from 'react';
import PropTypes from 'prop-types';
import {Grid,TextField} from '@material-ui/core';
import '../assets/style.css';
import Hidden from "@material-ui/core/Hidden";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
 root: {
    display: 'flex',
    flexWrap: 'wrap',
     
  },
  margin: {
    margin: theme.spacing(1),
     
  },
  textField: {
    flexBasis: 100,
    
  },
 
}));
const NavTesting = ({ categories, setCategoryId, handleDrawerClose }) => {
  const classes = useStyles();


  return (
    <Hidden only={["sm", "xs","md"]} implementation="css">
    <Grid container>
      <Grid item xs={12} align="center">
      <div className="root">
      <TextField
        select
        className={clsx(classes.margin, classes.textField)}
        SelectProps={{
          native: true,
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="dense"
        variant="outlined"
      > 
      
        {categories.map(obj => (
          <option key={obj.id} onClick={()=>{ setCategoryId(obj.id); }} className="text2">
            {obj.name}
          </option>
        ))}
      </TextField>
      </div>
     
      </Grid>
      </Grid>
    </Hidden>
  );
};

NavTesting.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  setCategoryId: PropTypes.func,
  handleDrawerClose: PropTypes.func,
};

export default NavTesting;
