import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Paper, CardMedia, Divider, Hidden } from '@material-ui/core';
import { BASEURL_ITEM_IMAGES } from '../constants';
import QuantitySelect from '../containers/QuantitySelect';
import CartItemPropTypes from './CartItemPropTypes';
import './style.css';
const uuidv1 = require('uuid/v1');


const useStyles = makeStyles(theme => ({
  gridRow: {
    padding: theme.spacing(2),
    backgroundColor: '#f2f2f2',
   
  },
  gridCell: {
    display: 'flex',
  },
  imagePC: {
    width: 50,
    height: 64,
    borderRadius:10,
    border:'1px solid grey'
  },
  imageMobile: {
    height: '50%',
    paddingTop: '78%',
    borderRadius:10,
    border:'1px solid grey',
    width: '70%'
  },
  paperMobile: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: '#f2f2f2'
  },
  girdDv :{
    marginTop:20,
    
  },
}));

const CartTable = ({ cart, showQty }) => {
  const classes = useStyles();
  
  
  const addDivider = (rows) => {
    rows.push(<Grid key={uuidv1()} item xs={12}><Divider /></Grid>);
  };

  //componet list for PC
  
  const tableRows = []; //for PC
 
  tableRows.push(
    <div key={uuidv1()}  className={classes.girdDv}>
    <Grid container className={classes.gridRow} variant='contained'>
      <Grid item xs={3} className={classes.gridCell}>
        <Box ml="0" mr="auto" flexGrow={1} fontWeight={600} color='#cccccc' >Description</Box>
      </Grid>
       <Grid item xs={3} className={classes.gridCell}>
        <Box ml="0" mr="auto" my="auto" fontWeight={600} color='#cccccc'>Name</Box>
      </Grid>
      <Grid item xs={2} className={classes.gridCell}>
        <Box ml="0" mr="auto" my="auto" fontWeight={600} color='#cccccc'>Kyats (Ks)</Box>
      </Grid>
      <Grid item xs={2} className={classes.gridCell}>
        <Box ml="0" mr="auto" my="auto" fontWeight={600} color='#cccccc'>Qty.</Box>
      </Grid>
      <Grid item xs={2} className={classes.gridCell}>
        <Box ml="0" mr="auto" my="auto" fontWeight={600} color='#cccccc'>Price (Ks)</Box>
      </Grid>
     </Grid>
    </div>
  );
  addDivider(tableRows);

  //componet list for Mobile
  const paperRows = []; //for Mobile


  //loop per cartItem
  cart.forEach((row, i) => {
    //rows for PC
    tableRows.push(
      <Grid container key={row.id} className={classes.gridRow}>
        <Grid item xs={3} className={classes.gridCell}>
          <CardMedia
            className={classes.imagePC}
            image={BASEURL_ITEM_IMAGES+row.image}
            title={row.name}
          />
        
        </Grid>
         <Grid item xs={3} className={classes.gridCell}>
          <Box ml="0" mr="auto" fontWeight={600} className='nameTxt'>
            {row.name}
          </Box>
        </Grid>
        <Grid item xs={2} className={classes.gridCell}>
          <Box ml="0" mr="auto" className='priceTxt'>
            {row.price}
          </Box>
        </Grid>
   
        <Grid item xs={2} className={classes.gridCell}>
        <Box ml="0" mr="auto">
          <Box mx="auto" my="auto">
          {showQty?<div>{row.quantity}</div>:<QuantitySelect id={row.id} quantity={row.quantity} />}
          </Box>
        </Box>
        </Grid>
        
        <Grid item xs={2} className={classes.gridCell}>
          <Box ml="0" mr="auto" fontWeight={600} color='#663300'>
            {row.subTotal}
          </Box>
        </Grid>
      </Grid>
    );
    //Add devider except last item.
    if (i + 1 < cart.length) {
      addDivider(tableRows);
    }
// {showMenu ? <MenuIcon />:null}
    //rows for Mobile
    paperRows.push( 
      <Paper key={'XXX'+row.id} className={classes.paperMobile}>
        <Grid item xs={4}>
          <CardMedia
              className={classes.imageMobile}
              image={BASEURL_ITEM_IMAGES+row.image}
              title={row.name}
            />
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" flexDirection="column" height="100%">
            <Box fontWeight={400} ml={0} mt={0} my={0}>
              Description:{row.name}
            </Box>
            <Box display="flex" my={1}>
              Qty:<div>{row.quantity}</div>
            </Box>
            <Box fontWeight={400} ml={0} mt={0} my={0}>
             Price: @{row.price} Ks
            </Box>
            <Box fontWeight={400} ml={0} mt={0} my={0}>
             Total: {row.subTotal} Ks
            </Box>
          </Box>
        </Grid>
      </Paper>
    );
   
  });
  return (
    <React.Fragment>
      <Hidden smUp implementation="css">
      {paperRows}
      </Hidden>
      <Hidden xsDown implementation="css">
        <Paper>{tableRows}</Paper>
      </Hidden>
       
    </React.Fragment>
  );
};

CartTable.propTypes = {
  cart: PropTypes.arrayOf(CartItemPropTypes.isRequired).isRequired,
};

export default CartTable;
