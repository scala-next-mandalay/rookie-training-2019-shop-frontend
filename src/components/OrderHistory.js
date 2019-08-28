import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import { Button, Container, Paper,Box,TextField,Grid,Divider,Table,TableHead,TableBody,TableCell,TableFooter,TablePagination,TableRow} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/ArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/ArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import '../assets/style.css';
import TitleBar from '../containers/TitleBar';
import { withRouter } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Login from '../containers/Login';
import Tooltip from '@material-ui/core/Tooltip';
import { FormattedMessage } from 'react-intl';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
  
}));

const TablePaginationActions=props=> {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick=event=> {
    onChangePage(event, 0);
  };

  const handleBackButtonClick=event=> {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick=event=>{
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick=event=> {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
   
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <Tooltip title="LastPage"><LastPageIcon /></Tooltip>  : <Tooltip title="FirstPage"><FirstPageIcon /></Tooltip>}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <Tooltip title="Next"><KeyboardArrowRight  fontSize="large"/></Tooltip> : <Tooltip title="Previous"><KeyboardArrowLeft  fontSize="large"/></Tooltip>}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <Tooltip title="Previous"><KeyboardArrowLeft  fontSize="large"/></Tooltip> : <Tooltip title="Next"><KeyboardArrowRight  fontSize="large"/></Tooltip>}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <Tooltip title="FirstPage"><FirstPageIcon /></Tooltip>: <Tooltip title="LastPage"><LastPageIcon /></Tooltip>}
      </IconButton>
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(5),
    overflowX: 'auto'
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
   txtField:{
     marginTop: theme.spacing(3),
  },
   toolbar:{
   marginTop: theme.spacing(10),
  },
  homeSpace: {
    marginRight: theme.spacing(1),
  },
  btnGrid:{
    marginTop: theme.spacing(3),
  },
 
  
}));

const OrderHistory = ({orders,searchTextOrderId,setSearchByOrderId,clickOrderId,searchTextBegin,searchTextEnd,setbeginDate,setendDate,history,fetchAuthedUser, user, refreshToken}) => {

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);
  const handleChangeSearchByOrderId = (event) => {
      setSearchByOrderId(event.target.value);
      setPage(0);
    };
    const handleChangeSearchDateBegin = (event) => {
      setbeginDate(event.target.value);
      setPage(0);
      
    };
    const handleChangeSearchDateEnd = (event) => {
      setendDate(event.target.value);
      setPage(0);
      
    };
    const link = id=> (event) => {
      event.preventDefault();
      clickOrderId(id);
      history.push("/orderdetail");
    };
    const handleChangePage=(event, newPage)=> {
    setPage(newPage);
    };

    const handleChangeRowsPerPage=event=> {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };
    
    const handleHome = event => {
    event.preventDefault();
    history.push("/");
    };
    
   const handleBack = event => {
    event.preventDefault();
    history.push("/checkout");
    };
  
   const isFirstRef = React.useRef(true);
    React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      fetchAuthedUser();
    }
  });
    
  const show=( <Container maxWidth="lg">
        <TitleBar showMenu={false} showIcon={false} showNav={false}/>
        <div className={classes.toolbar}/>
        
        <Box display="flex" >
            <Box ml="auto" my="auto" mr={0} mt={3}>
            
           <Button onClick={handleHome} variant="contained" color="primary">
            <HomeIcon className={classes.homeSpace} />
               <FormattedMessage id="Button.Shopping" defualtMessage="Shopping" />
          </Button>
       
            </Box>
        </Box>
      <Box className="txt3" mt={3}><FormattedMessage id="Label.OrderHistory" defualtMessage="Order History" /></Box>
      <Grid container className="text2"><Box mt={2}><FormattedMessage id="Label.OrderText" /></Box></Grid>
      <Grid container spacing={3}>
      <Grid item xs={4} sm={2} className={classes.txtField}>
      <Grid className="text1">OrderId</Grid>
     
      </Grid>
      <Grid item xs={8} sm={3}>
        <Grid>
       
         <TextField
             id="search"
             onChange={handleChangeSearchByOrderId}
             autoFocus
             margin="normal"
             variant="outlined"
             fullWidth
             value={searchTextOrderId}
            />
         
        </Grid>
       
      </Grid>
    </Grid>
       <Grid container className="text2"><Box mt={2}><FormattedMessage id="Label.DateText" /></Box></Grid>
      <Grid container spacing={3}>
     
      <Grid item xs={4} sm={2} className={classes.txtField}>
        <Grid className="text1">From </Grid>
      </Grid>
      <Grid item xs={8} sm={3}>
        <Grid>  
        <Tooltip title="Select Begin Date">
        <TextField
        id="date1"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
         margin="normal"
         variant="outlined"
         fullWidth
         value={searchTextBegin}
         onChange={handleChangeSearchDateBegin}
      />
      </Tooltip>
      </Grid>
      </Grid>
       <Grid item xs={4} sm={2} className={classes.txtField}>
        <Grid className="text1">To</Grid>
      </Grid>
      <Grid item xs={8} sm={3}>
        <Grid>  
        <Tooltip title="Select End Date">
        <TextField
        id="date2"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
         margin="normal"
         variant="outlined"
         fullWidth
         value={searchTextEnd}
         onChange={handleChangeSearchDateEnd}
      />
      </Tooltip>
      </Grid>
      </Grid>
     
    </Grid>
   
        
        <Paper className={classes.root}>
        
        
        <Table>
        <TableHead className={classes.tbHead}>
        
          <TableRow>
             <TableCell align="left" className={classes.cell}>OrderId</TableCell>
             <TableCell align="left" className={classes.cell}>OrderDate</TableCell>
             <TableCell align="left" className={classes.cell}>First Name</TableCell>
             <TableCell align="left" className={classes.cell}>Last Name</TableCell>
             <TableCell align="left" className={classes.cell}>Total Bill</TableCell>
             <TableCell align="left" className={classes.cell}>Detail</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
            {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(obj => (
              <TableRow key={obj.id}>
                <TableCell align="left" ><div className="text2">{obj.id}</div></TableCell>
               <TableCell align="left" ><div className="text2">{obj.created_at}</div></TableCell>
               <TableCell align="left"><div className="text2">{obj.first_name}</div></TableCell>
               <TableCell align="left"><div className="text2">{obj.last_name}</div></TableCell>
               <TableCell align="left"><div className="text2">{obj.total_price}</div></TableCell>
               <TableCell> 
               <Button
                variant="contained"
                onClick={link(obj.id)}
                >
                <FormattedMessage id="Link.Detail" defualtMessage="Detail" />
              </Button></TableCell>
              </TableRow>
              
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
    
      </Table>
      </Paper>
       
    
    <Box></Box>
    <Divider/>
    <Box display="flex" >
    <Box ml="auto" my="auto" mr={0} mt={3}>
        <Button onClick={handleBack} variant="contained" color="primary"
                >
               <FormattedMessage id="Button.Back" defualtMessage="Back" />
        </Button>
    </Box>
    </Box>
       
  </Container>);
  const contents = user ?  show : <Login />;
  return (
    <div>
    {contents}
    </div>
    );
};
export default withRouter(OrderHistory);