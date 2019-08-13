import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  Container, Paper,Box,Grid,Divider,Hidden,Card,CardContent,Button} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TitleBar from '../containers/TitleBar';
import PropTypes from 'prop-types';
import '../assets/style.css';
import { withRouter } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import OrderHistory from '../containers/OrderHistory';
 import { FormattedMessage } from 'react-intl';



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
  },
  toolbar:{
  marginTop: theme.spacing(10),
  },
   homeSpace: {
    marginRight: theme.spacing(1),
  }
  
  

}));

const OrderDetail = ({orderitems,items, selectedOrder,history}) => {
  const classes = useStyles();
   const handleHome = event => {
    event.preventDefault();
    history.push("/");
  };
  const handleBack = event => {
    event.preventDefault();
    history.push("/orderhistory");
  };
  const OrderView=()=>{
    return( 
    <div>
     
    <div>
       <div className="title_Ship">
           <Grid  mt={1} mb={1}  className="nameTxt">
               <Grid item xs={12} sm={12} ml={1} className="txt4">Order Id- {selectedOrder!==null?selectedOrder.id:null} </Grid>
                <Grid container  mt={1} mb={1}  className="text2" >
                <Grid item xs={12} sm={6} >Order Date- {selectedOrder!==null?selectedOrder.created_at:null}</Grid>
                <Grid item xs={12} sm={6}>Order Total-{selectedOrder!==null?selectedOrder.total_price:null}</Grid>
                </Grid>
            </Grid>
      </div>
       <Grid container  mt={1} mb={1}  >
          <Grid item xs={12} sm={6} >
            <Card>
            <CardContent>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="text2" mr={0} display="flex" flexDirection="column">
            <Grid item xs={6} sm={6} className="txt4" fontSize={20}>Billing Address</Grid>
            <Grid item xs={6} sm={6} >{selectedOrder!==null?selectedOrder.first_name:null}{selectedOrder!==null?selectedOrder.last_name:null}</Grid>
            <Grid item xs={6} sm={6}>{selectedOrder===null?null:selectedOrder.address1} {selectedOrder===null?null:selectedOrder.address2}</Grid>
            <Grid item xs={6} sm={6} > {selectedOrder===null?null:selectedOrder.city}</Grid>
            <Grid item xs={6} sm={6} >{selectedOrder===null?null:selectedOrder.state}</Grid>
            <Grid item xs={6} sm={6}>{selectedOrder===null?null:selectedOrder.country}</Grid>
            <Grid item xs={6} sm={6} ></Grid>
            <Divider/>
            <Grid item xs={6} sm={6} className="txt4">Payment Method</Grid>
            <Grid item xs={6} sm={6} className="text2">Checkmoney/MoneyOrder</Grid>
             
           
            </Box>
          </CardContent>
          </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="text2" mr={0} display="flex" flexDirection="column">
            <Grid item xs={6} sm={6} className="txt4" fontSize={20}>Delivery Address</Grid>
            <Grid item xs={6} sm={6} >{selectedOrder!==null?selectedOrder.first_name:null}{selectedOrder!==null?selectedOrder.last_name:null}</Grid>
            <Grid item xs={6} sm={6}>{selectedOrder===null?null:selectedOrder.address1} {selectedOrder===null?null:selectedOrder.address2}</Grid>
            <Grid item xs={6} sm={6} > {selectedOrder===null?null:selectedOrder.city}</Grid>
            <Grid item xs={6} sm={6} >{selectedOrder===null?null:selectedOrder.state}</Grid>
            <Grid item xs={6} sm={6}>{selectedOrder===null?null:selectedOrder.country}</Grid>
            <Grid item xs={6} sm={6} ></Grid>
            <Divider/>
            
            <Grid item xs={6} sm={6} className="txt4">Shipping Method</Grid>
            <Grid item xs={6} sm={6} className="text2">Shipping</Grid>
           
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
        <Box> <FormattedMessage id="Label.SubTotal" /></Box>
        <Box><FormattedMessage id="Label.Tax" /></Box>
        <Box><FormattedMessage id="Label.TotalPrice" /></Box>
      </Grid>
      <Grid item xs={6} sm={4} className="nameTxt">
        <Box textAlign="right" pr={3}>{selectedOrder!==null?selectedOrder.total_price:null} MMK </Box>
        <Box textAlign="right" pr={3}>0.0 MMK </Box>
        <Box textAlign="right" pr={3}>{selectedOrder!==null?selectedOrder.total_price:null} MMK</Box>
      </Grid>
    </Box>
    </div>
      );
    };
    
  return(
    <div>
  {selectedOrder===null?<OrderHistory/>:
      <Container maxWidth="lg">
     
        <TitleBar showMenu={false} showIcon={false} showNav={false} />
          <div className={classes.toolbar}/>
          <Box display="flex" >
          <Box ml="auto" my="auto" mr={0} mt={3}>
            <Hidden only={['xs','sm']}>
            <Button onClick={handleHome} variant="contained" color="primary">
              <HomeIcon className={classes.homeSpace} />
              <FormattedMessage id="Button.Shopping"/>
            </Button>
           </Hidden>
           <Hidden mdUp>
           <Button onClick={handleHome} variant="contained" color="primary">
              <HomeIcon className={classes.homeSpace} />
             <FormattedMessage id="Button.Shopping" />
          </Button>
          </Hidden>
        </Box>
        </Box>
            
        <Box className="txt3" mt={3}> <FormattedMessage id="Label.OrderHistory" /></Box>
        <OrderView/>
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
              <TableCell align="left"><div className="text2">{obj.id}</div></TableCell>
              <TableCell align="left"><div className="text2">{selectedOrder!==null?selectedOrder.id:null}</div></TableCell>
              <TableCell align="left"><div className="text2">{obj.item_id}</div></TableCell>
              <TableCell align="left"><div className="text2">{obj.name}</div></TableCell>
              <TableCell align="left"><div className="text2">{obj.unit_price}</div></TableCell>
              <TableCell align="left"><div className="text2">{obj.quantity}</div></TableCell>
              <TableCell align="left"><div className="text2">{obj.unit_price*obj.quantity}</div></TableCell>
            </TableRow>
            ))
        }
      </TableBody>
      </Table>
          
          <TotalView />
           
      </Paper>
      
    
   
        
          <Box display="flex" >
            <Box ml="auto" my="auto" mr={3} mt={3}>
            <Button onClick={handleBack} variant="contained" color="primary"
                >
              <FormattedMessage id="Button.Back" />
            </Button>
        </Box>
       </Box>
    
     
       
      </Container>}
      </div>
  );
 
};

OrderDetail.propTypes = {
  orderitems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired
};


export default withRouter(OrderDetail);