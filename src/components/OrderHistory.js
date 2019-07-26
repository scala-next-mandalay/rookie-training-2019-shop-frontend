import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  Container, Paper,Box,Link,TextField,Grid,Divider} from '@material-ui/core';
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
  od:{
     marginTop: theme.spacing(3),
  }
  

}));

const CheckoutConfirm = ({orders,cart,requestParams,showMenu,totalPrice,totalQuantity,searchText,setSearchText,clickOrderId,searchTextBegin,searchTextEnd,setbeginDate,setendDate}) => {
   const classes = useStyles();
   const handleChangeSearch = (event) => {
      setSearchText(event.target.value);
     
    };
     const handleChangeSearch1 = (event) => {
      setbeginDate(event.target.value);
      
     
    };
     const handleChangeSearch2 = (event) => {
      setendDate(event.target.value);
      
     
    };
    
    const link = id=> () => {
      clickOrderId(id);
    };
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
       
      <Box className="txt3" mt={3}>Your Order History List  </Box>
      <Grid container spacing={3}>
    
      <Grid item xs={6} sm={3}>
        <Grid className={classes.od}>From(Select By Date)</Grid>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Grid>  
        <TextField
        id="date"
        type="date"
        defaultValue="2018-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
         margin="normal"
         variant="outlined"
         fullWidth
         value={searchTextBegin}
         onChange={handleChangeSearch1}
      />
      </Grid>
      </Grid>
       <Grid item xs={6} sm={3}>
        <Grid className={classes.od}>To(Select By Date)</Grid>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Grid>  
        <TextField
        id="date"
        type="date"
        defaultValue="2018-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
         margin="normal"
         variant="outlined"
         fullWidth
         value={searchTextEnd}
         onChange={handleChangeSearch2}
      />
      </Grid>
      </Grid>
        <Grid item xs={6} sm={3}>
        <Grid className={classes.od}>Order Id(Select By Order Id)</Grid>
     
      </Grid>
      <Grid item xs={6} sm={3}>
        <Grid>
         <TextField
             id="search"
             placeholder="Search"
             value={searchText}
             onChange={handleChangeSearch}
             autoFocus
             margin="normal"
             variant="outlined"
             fullWidth
             
            />
        </Grid>
       
      </Grid>
    </Grid>
        
        <Paper className={classes.root}>
        
        <Table className={classes.table}>
        <TableHead className={classes.tbHead}>
          <TableRow>
             <TableCell align="left" >OrderId</TableCell>
             <TableCell align="left" >OrderDate</TableCell>
             <TableCell align="left" >First Name</TableCell>
             <TableCell align="left" >Last Name</TableCell>
             <TableCell align="left" >Total Bill</TableCell>
             <TableCell> Detail</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
            {
          orders.map((obj) => (
            <TableRow key={obj.id} className="tbr">
              <TableCell align="left" ><div>{obj.id}</div></TableCell>
               <TableCell align="left"><div>{obj.created_at}</div></TableCell>
               <TableCell align="left"><div>{obj.first_name}</div></TableCell>
               <TableCell align="left"><div>{obj.last_name}</div></TableCell>
               <TableCell align="left"><div>{obj.total_price}</div></TableCell>
               <TableCell> 
               <Link
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                 to="/orderdetail"
                 component={RouterLink}  onClick={link(obj.id)}
            >
              >>>View Detail
            </Link></TableCell>
            </TableRow>
            ))
        }
      </TableBody>
      </Table>
      </Paper>
       
    
     <Box></Box>
      <Divider/>
          <Box display="flex" >
            <Box ml="auto" my="auto" mr={3} mt={3}>
            <Link className='ho' to="/checkout"
                component={RouterLink}
                >
               >>> Back
            </Link>
    </Box>
    </Box>
       
      </Container>
  );
 
};
CheckoutConfirm.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  totalQuantity: PropTypes.number.isRequired,

};
CheckoutConfirm.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired
};

export default CheckoutConfirm;