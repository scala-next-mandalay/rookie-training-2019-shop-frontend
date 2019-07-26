import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {  Container, Paper,Hidden,Box,Grid,Link } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TitleBar from '../containers/TitleBar';
import ToolbarSpacer from './ToolbarSpacer';
import PropTypes from 'prop-types';
import './style.css';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
   tbHead: {
    backgroundColor:'#f2f2f2',
  },
  

}));
const OrderSuccess = ({postResultObj}) => {
    console.log('AAAA', postResultObj)
  const classes = useStyles();
  
  if (!postResultObj) {
      return (<div>...loading</div>)
  }
  
  
  return(
      <Container maxWidth="lg">
      <TitleBar showMenu={false} showIcon={false}/>
      <ToolbarSpacer/>
        <Box display="flex" >
        <Box ml="auto" my="auto" mr={3} mt={3}>
            <Link className='priceTxt' to="/"
                component={RouterLink}
                >
                Continue Shopping
            </Link>
        </Box>
       </Box>
        <Link className='ho' to="/orderhistory"
            component={RouterLink}
            >
            View Order History
       </Link>
      
     
      <Paper className={classes.root}>
      <div className="title_Ship">
      <div className="ho">..Success..!</div>
      <div className="priceTxt">Your Order is complete.</div>
      <div className="nameTxt">Your Detail Info</div>
      </div>
      <Table className={classes.table}>
        <TableHead className={classes.tbHead}>
          <TableRow>
             <TableCell align="left" >F Name</TableCell>
             <TableCell align="left" >L Name</TableCell>
             <TableCell align="left" >Address1</TableCell>
             <TableCell align="left" >Address2</TableCell>
             <TableCell align="left" >Country</TableCell>
             <TableCell align="left" >State</TableCell>
             <TableCell align="left" >City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow >
             <TableCell align="left" className='priceTxt'>{postResultObj.first_name}</TableCell>
             <TableCell align="left" className='priceTxt'>{postResultObj.last_name}</TableCell>
             <TableCell align="left" className='priceTxt'>{postResultObj.address1}</TableCell>
             <TableCell align="left" className='priceTxt'>{postResultObj.address2}</TableCell>
             <TableCell align="left" className='priceTxt'>{postResultObj.country}</TableCell>
             <TableCell align="left" className='priceTxt'>{postResultObj.state}</TableCell>
             <TableCell align="left" className='priceTxt'>{postResultObj.city}</TableCell>
            </TableRow>
         <Hidden only={["xs","sm"]}>
          <TableRow className='priceTxt'>
            <TableCell colSpan={5}>Subtotal</TableCell>
            <TableCell align="left"><Box className='priceTxt'>{postResultObj.total_price} MMK</Box></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}>Sale Tax(0%)</TableCell>
            <TableCell align="left"><Box className='priceTxt'>0 MMK</Box></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell align="left"><Box className='priceTxt'>{postResultObj.total_price} MMK</Box></TableCell>
          </TableRow>
         </Hidden>
        </TableBody>
      </Table>
       <Hidden mdUp>
        <Box display="flex" flexDirection="column" marginTop="20px" backgroundColor="#f2f2f2">
           <Paper>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="nameTxt" mr={0} display="flex">
            <Grid className="priceTxt" item xs={6} sm={6}> Subtotal :</Grid> <Grid xs={6} sm={6} className={classes.gridTotalPrice}> {postResultObj.total_price}MMK</Grid>
            </Box>
          </Paper>
        <Box display="flex" flexDirection="column" marginTop="20px" backgroundColor="#f2f2f2">
           <Paper>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="nameTxt" mr={0} display="flex">
            <Grid className="priceTxt" item xs={6} sm={6}> Sale Tax :</Grid> <Grid xs={6} sm={6} className={classes.gridTotalPrice}> 0 MMK</Grid>
            </Box>
           </Paper>
        </Box>
        </Box>
          <Box display="flex" flexDirection="column" marginTop="20px" backgroundColor="#f2f2f2">
           <Paper>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="nameTxt" mr={0} display="flex">
            <Grid className="priceTxt" item xs={6} sm={6}> Total :</Grid> <Grid xs={6} sm={6} className={classes.gridTotalPrice}> {postResultObj.total_price}MMK</Grid>
            </Box>
          </Paper>
         </Box>
        </Hidden>
        </Paper>
      </Container>
  );
 
};
OrderSuccess.propTypes = {
  postResultObj: PropTypes.object.isRequired,


};

export default OrderSuccess;