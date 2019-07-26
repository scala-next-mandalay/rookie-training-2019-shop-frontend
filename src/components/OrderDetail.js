import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  Container, Paper,Box,Link,Grid,Divider,Hidden,Card,CardContent} from '@material-ui/core';
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
    marginBottom: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
   tbHead: {
    backgroundColor:'#9A7B66',
    color:'#ffffff'
  },
  cell: {
   fontWeight:'bold',
   fontFamily:'play_fair,serif',
   color:'#ffffff'
  },
  
  btn:{
      marginBottom: theme.spacing(3),
  }
  

}));

const OrderDetail = ({orderitems,items, selectedOrder}) => {
  console.log('##SELECTEDORDER', selectedOrder);
  console.log("component items " , items);
  console.log("component orderitems ", orderitems);
  const classes = useStyles();
  const OrderView=()=>{
    return( 
    <div>
     
    <div>
       <div className="title_Ship">
           <Grid  mt={1} mb={1}  className="nameTxt">
               <Grid item xs={12} sm={12} ml={1} className="txt4">Order Id- {selectedOrder===null?null:selectedOrder.id}</Grid>
                <Grid container  mt={1} mb={1}  className="priceTxt" >
                <Grid item xs={12} sm={6} >Order Date- {selectedOrder===null?null:selectedOrder.created_at}</Grid>
                <Grid item xs={12} sm={6}>Order Total-{selectedOrder===null?null:selectedOrder.total_price}</Grid>
                </Grid>
            </Grid>
      </div>
       <Grid container  mt={1} mb={1}  className="priceTxt" >
          <Grid item xs={12} sm={6} >
            <Card>
            <CardContent>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="nameTxt" mr={0} display="flex" flexDirection="column">
            <Grid item xs={6} sm={6} className="txt4" fontSize={20}>Billing Address</Grid>
            <Grid item xs={6} sm={6} className="priceTxt">{selectedOrder!==null?selectedOrder.first_name:null}{selectedOrder!==null?selectedOrder.last_name:null}</Grid>
            <Grid item xs={6} sm={6}>{selectedOrder===null?null:selectedOrder.address1} {selectedOrder===null?null:selectedOrder.address2}</Grid>
            <Grid item xs={6} sm={6} > {selectedOrder===null?null:selectedOrder.city}</Grid>
            <Grid item xs={6} sm={6} >{selectedOrder===null?null:selectedOrder.state}</Grid>
            <Grid item xs={6} sm={6}>{selectedOrder===null?null:selectedOrder.country}</Grid>
            <Grid item xs={6} sm={6} ></Grid>
            <Divider/>
            <Grid item xs={6} sm={6} className="txt4">Payment Method</Grid>
            <Grid item xs={6} sm={6} className="priceTxt">Checkmoney/MoneyOrder</Grid>
             
           
            </Box>
          </CardContent>
          </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="nameTxt" mr={0} display="flex" flexDirection="column">
            <Grid item xs={6} sm={6} className="txt4" fontSize={20}>Delivery Address</Grid>
            <Grid item xs={6} sm={6} className="priceTxt">{selectedOrder!==null?selectedOrder.first_name:null}{selectedOrder!==null?selectedOrder.last_name:null}</Grid>
            <Grid item xs={6} sm={6}>{selectedOrder===null?null:selectedOrder.address1} {selectedOrder===null?null:selectedOrder.address2}</Grid>
            <Grid item xs={6} sm={6} > {selectedOrder===null?null:selectedOrder.city}</Grid>
            <Grid item xs={6} sm={6} >{selectedOrder===null?null:selectedOrder.state}</Grid>
            <Grid item xs={6} sm={6}>{selectedOrder===null?null:selectedOrder.country}</Grid>
            <Grid item xs={6} sm={6} ></Grid>
            <Divider/>
            
            <Grid item xs={6} sm={6} className="txt4">Shipping Method</Grid>
            <Grid item xs={6} sm={6} className="priceTxt">Shipping</Grid>
           
            </Box>
           </CardContent>
          </Card>
          </Grid>
         </Grid>
     
      </div> 
      </div>
      );
  };
  const TotalView=()=>{
    return(
      <div>
     
        <Box display="flex" mt={2} pl={3} pb={3}>
      <Grid item xs={false} sm={4}>
        <Box> </Box>
      </Grid>
      <Grid item xs={6} sm={4} className="nameTxt">
        <Box>TOTAL QUANTITY(Items)</Box>
        <Box> SUBTOTAL </Box>
        <Box>SALES TAX(0%)</Box>
        <Box>TOTAL</Box>
      </Grid>
      <Grid item xs={6} sm={4} className="nameTxt">
        <Box textAlign="right" pr={3}> (Items)</Box>
        <Box textAlign="right" pr={3}>{selectedOrder!==null?selectedOrder.total_price:null} MMK </Box>
        <Box textAlign="right" pr={3}>0.0 MMK </Box>
        <Box textAlign="right" pr={3}>{selectedOrder!==null?selectedOrder.total_price:null} MMK</Box>
      </Grid>
    </Box>
    </div>
      );
    };
    
  return(
 
      <Container maxWidth="lg">
            <TitleBar showMenu={false} showIcon={false} showNav={false} />
            <ToolbarSpacer/>
            <Box display="flex" >
            <Box ml="auto" my="auto" mr={3} mt={3}>
            <Link  to="/"
                component={RouterLink}
                className='priceTxt'
                >
                Continue Shopping
            </Link>
            </Box>
            </Box>
            <Box className="txt3" mt={3}>Order Information  </Box>
            {selectedOrder===null?<Hidden><OrderView/></Hidden>:<OrderView/>}
         <Paper className={classes.root}>
        
       <Table className={classes.table}>
        <TableHead className={classes.tbHead}>
          <TableRow>
             <TableCell align="left" className={classes.cell}>Id</TableCell>
             <TableCell align="left" className={classes.cell}>OrderId</TableCell>
             <TableCell align="left" className={classes.cell}>Item Id </TableCell>
             <TableCell align="left" className={classes.cell}>Item Name</TableCell>
             <TableCell align="left" className={classes.cell}>Price</TableCell>
             <TableCell align="left" className={classes.cell}>Qty</TableCell>
             <TableCell align="left" className={classes.cell}>Total Price</TableCell>
         
            
          </TableRow>
        </TableHead>
        <TableBody>
            {
          orderitems.map((obj) => (
            <TableRow key={obj.id} className="tbr">
              <TableCell align="left"><div >{obj.id}</div></TableCell>
              <TableCell align="left"><div>{obj.order_id}</div></TableCell>
              <TableCell align="left"><div>{obj.item_id}</div></TableCell>
              <TableCell align="left"><div>{obj.item_name}</div></TableCell>
              <TableCell align="left"><div className="nameTxt">{obj.unit_price}</div></TableCell>
              <TableCell align="left"><div className="nameTxt">{obj.quantity}</div></TableCell>
              <TableCell align="left"><div className="nameTxt">{obj.unit_price*obj.quantity}</div></TableCell>
            </TableRow>
            ))
        }
      </TableBody>
      </Table>
          {selectedOrder===null?<Hidden><TotalView/></Hidden>:<TotalView />}
           
      </Paper>
      
    
   
         <Divider/>
          <Box display="flex" >
            <Box ml="auto" my="auto" mr={3} mt={3}>
            <Link className='ho' to="/orderhistory"
                component={RouterLink}
                >
               >>> Back
            </Link>
        </Box>
       </Box>
    
     
       
      </Container>
  );
 
};

OrderDetail.propTypes = {
  orderitems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired
};


export default OrderDetail;