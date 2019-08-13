import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {  Container, Paper,Hidden,Box,Grid,Button,Divider,Typography} from '@material-ui/core';
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
import { FormattedMessage } from 'react-intl';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkout from '../containers/Checkout';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


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
  toolbar:{
   marginTop: theme.spacing(10),
  },
  IconSpace: {
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(3, 0)
  },
  boxTitle: {
    fontWeight: 600,
    padding: theme.spacing(2, 0),
    marginLeft: theme.spacing(3)
  },
  boxValue: {
    padding: theme.spacing(2, 0),
    letterSpacing: '2px',
     marginLeft: theme.spacing(2)
  },
  main :{
    marginTop: theme.spacing(5),
  },
   title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
   btnProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
   AppDiv:{
       flexGrow: 1,
   }

}));

const OrderSuccess = ({cart,postResultObj,requestParams,showMenu,showIcon,showNav,history, loading,postOrder,totalPrice,totalQuantity}) => {
  const classes = useStyles();
  
  
 const handleBack = event => {
    event.preventDefault();
    history.push("/checkout");
    };
 
  const handleHome = event => {
    event.preventDefault();
    history.push("/");
  };
  const handleSubmit = event => {
    event.preventDefault();
    postOrder();

  };
   const handleClose = event => {
    event.preventDefault();
    history.push("/checkout");
  };

  return !postResultObj ? 
      <div>
      {requestParams === null?<Checkout/>:
      <Container maxWidth="lg">
        <TitleBar showMenu={false} showIcon={false} showNav={false}/>
          <div className={classes.toolbar}/>
          <Box display="flex" >
          <Box ml="auto" my="auto" mr={1}>
           
           <Button onClick={handleHome} variant="contained" color="primary">
              <HomeIcon className={classes.homeSpace} />
              <FormattedMessage id="Button.Shopping" defualtMessage="Shopping" />
          </Button>
        
          </Box>
         </Box>
        
         <form className={classes.form} noValidate onSubmit={handleSubmit}>
        
         <Container maxWidth="lg" className={classes.main}>
           <div className={classes.AppDiv}>  
          <AppBar position="static">
          <Toolbar variant="dense">
         
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
           <Typography variant="h6" className={classes.title}>
             <FormattedMessage id="Label.OrderConfirm" defualtMessage="Order Confirmation" />
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              <FormattedMessage id="Button.Close" defualtMessage="Close" />
            </Button>
         </Toolbar>
        </AppBar>
        </div>
          <Paper className={classes.paper} >
           
           <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>First name : </Box>
              <Box className={classes.boxValue}><div className="text2">{requestParams !== null ? requestParams.first_name : null}</div></Box>
            </Box>
            <Divider />
           
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>Last name : </Box>
              <Box className={classes.boxValue}><div className="text2">{requestParams !== null ?requestParams.last_name:null}</div></Box>
            </Box>
            <Divider />
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>Address1 : </Box>
              <Box className={classes.boxValue}><div className="text2">{requestParams !== null ?requestParams.address1:null}</div></Box>
            </Box>
             <Divider />
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>Address2 : </Box>
              <Box className={classes.boxValue}><div className="text2">{requestParams !== null ?requestParams.address2:null}</div></Box>
            </Box>
             <Divider />
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>Country : </Box>
              <Box className={classes.boxValue}><div className="text2">{requestParams !== null ?requestParams.country:null}</div></Box>
            </Box>
             <Divider />
            <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>State : </Box>
              <Box className={classes.boxValue}><div className="text2">{requestParams !== null ?requestParams.state:null}</div></Box>
            </Box>
             <Divider />
           <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}>City : </Box>
              <Box className={classes.boxValue}><div className="text2">{requestParams !== null ?requestParams.city:null}</div></Box>
           </Box>
           </Box>
            <Divider />
            <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}><FormattedMessage id="Label.TotalQuantity" defualtMessage="Total Quantity" /></Box>
              <Box className={classes.boxValue}>{totalQuantity}</Box>
             </Box>
             </Box>
              <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row">
              <Box className={classes.boxTitle}><FormattedMessage id="Label.TotalPrice" defualtMessage="Total Price" /></Box>
              <Box className={classes.boxValue}>{totalPrice}(MMK)</Box>
             </Box>
             </Box>
          </Paper>
          <Grid container>

            <Button
            fullWidth
            className={classes.submitButton}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
           >
            <FormattedMessage id="Button.Confirm" defualtMessage="Confirm" />
           </Button>
            {loading && <CircularProgress size={24} className={classes.btnProgress} />}
           </Grid>
          </Container>
        </form>
        <Box display="flex" >
        <Box ml="auto" my="auto" mr={0} mt={3}>
        <Button onClick={handleBack} variant="contained" color="primary"
                >
         <FormattedMessage id="Button.Back" />
        </Button>
        </Box>
        </Box>
        </Container>}
        </div>
        : (
     <Container maxWidth="lg">
      <TitleBar showMenu={false} showIcon={false} showNav={false}/>
      <div className={classes.toolbar}/>
      
        <Box display="flex" >
          <Box ml="auto" my="auto" mr={1}>
          
           <Button onClick={handleHome} variant="contained" color="primary">
              <HomeIcon className={classes.homeSpace} />
              <FormattedMessage id="Button.Shopping" defualtMessage="Shopping" />
          </Button>
        
          </Box>
         </Box>
         
      <Paper className={classes.root}>
     
      <div className="title_Ship">
      <div className="ho"><FormattedMessage id="Label.OrderSuccess"/></div>
      <div className="priceTxt"><FormattedMessage id="Label.OrderSuccessId"/>{postResultObj.id}</div>
      <div className="nameTxt"><FormattedMessage id="Label.InfoDetail"/></div>
      </div>
     <Table className={classes.table}>
        <TableHead className={classes.tbHead}>
          <TableRow>
             <TableCell align="left" >FirstName</TableCell>
             <TableCell align="left" >LastName</TableCell>
             <TableCell align="left" >Address1</TableCell>
             <TableCell align="left" >Address2</TableCell>
             <TableCell align="left" >Country</TableCell>
             <TableCell align="left" >State</TableCell>
             <TableCell align="left" >City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow >
             <TableCell align="left"><div className="text2">{postResultObj!==null?postResultObj.first_name:null}</div></TableCell>
             <TableCell align="left"><div className="text2">{postResultObj!==null?postResultObj.last_name:null}</div></TableCell>
             <TableCell align="left"><div className="text2">{postResultObj!==null?postResultObj.address1:null}</div></TableCell>
             <TableCell align="left"><div className="text2">{postResultObj!==null?postResultObj.address2:null}</div></TableCell>
             <TableCell align="left"><div className="text2">{postResultObj!==null?postResultObj.country:null}</div></TableCell>
             <TableCell align="left"><div className="text2">{postResultObj!==null?postResultObj.state:null}</div></TableCell>
             <TableCell align="left"><div className="text2">{postResultObj!==null?postResultObj.city:null}</div></TableCell>
            </TableRow>
         <Hidden only={["xs","sm"]}>
          <TableRow>
             <TableCell rowSpan={6} />
            <TableCell colSpan={5}><div className='text1'><FormattedMessage id="Label.SubTotal"/></div></TableCell>
            <TableCell align="left"><div className='text1'>{postResultObj!==null?postResultObj.total_price:null} MMK</div></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}><div className='text1'><FormattedMessage id="Label.Tax"  /></div></TableCell>
            <TableCell align="left"><Box className='text1'>0 MMK</Box></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5}><div className='text1'><FormattedMessage id="Label.TotalPrice"/></div></TableCell>
            <TableCell align="left"><div className='text1'>{postResultObj!==null?postResultObj.total_price:null} MMK</div></TableCell>
          </TableRow>
         </Hidden>
        </TableBody>
      </Table>
        
       <Hidden mdUp>
        <Box display="flex" flexDirection="column" mt="20px">
           <Paper>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="text1" mr={0} display="flex">
            <Grid className="priceTxt" item xs={6} sm={6}> <FormattedMessage id="Label.SubTotal"/> :</Grid> <Grid item xs={6} sm={6} className={classes.gridTotalPrice}> {postResultObj!==null?postResultObj.total_price:null}MMK</Grid>
            </Box>
          </Paper>
        <Box display="flex" flexDirection="column" marginTop="20px">
           <Paper>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="text1" mr={0} display="flex">
            <Grid className="priceTxt" item xs={6} sm={6}><FormattedMessage id="Label.Tax"/>:</Grid> <Grid item xs={6} sm={6} className={classes.gridTotalPrice}> 0 MMK</Grid>
            </Box>
           </Paper>
        </Box>
        </Box>
          <Box display="flex" flexDirection="column" marginTop="20px">
           <Paper>
            <Box  mt={1} mb={1} ml={2} textAlign="left" className="text1" mr={0} display="flex">
            <Grid className="priceTxt" item xs={6} sm={6}> <FormattedMessage id="Label.TotalPrice"/> :</Grid> <Grid item xs={6} sm={6} className={classes.gridTotalPrice}> {postResultObj!==null?postResultObj.total_price:null}MMK</Grid>
            </Box>
          </Paper>
         </Box>
        </Hidden>
      
 
        </Paper>
        <Box display="flex" >
        <Box ml="auto" my="auto" mr={0} mt={3}>
        <Button onClick={handleBack} variant="contained" color="primary"
                >
         <FormattedMessage id="Button.Back" />
        </Button>
        </Box>
        </Box>
       </Container>
     
  );
 
};

OrderSuccess.propTypes = {
   totalPrice: PropTypes.number.isRequired,
   totalQuantity: PropTypes.number.isRequired,
};
export default withRouter(OrderSuccess);

