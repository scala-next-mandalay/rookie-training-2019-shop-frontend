import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import {  Container, Paper,Box,Button} from '@material-ui/core';
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
  }
}));


const CheckoutConfirm = ({postResultObj,history}) => {
  const classes = useStyles();
  
  const handleHome = event => {
    event.preventDefault();
    history.push("/");
  };
  
  return (
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
          <div className="text2"><FormattedMessage id="Label.OrderSuccessId"/> {postResultObj.id}</div>
          <div className="text1"><FormattedMessage id="Label.InfoDetail"/></div>
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
            <TableRow>
              <TableCell rowSpan={6} />
              <TableCell colSpan={5}><div className='text1'><FormattedMessage id="Label.SubTotal"/></div></TableCell>
              <TableCell align="left"><div className='text1'>{postResultObj!==null?postResultObj.total_price:null}MMK</div></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}><div className='text1'><FormattedMessage id="Label.Tax"/></div></TableCell>
              <TableCell align="left"><Box className='text1'>0MMK</Box></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}><div className='text1'><FormattedMessage id="Label.TotalPrice"/></div></TableCell>
              <TableCell align="left"><div className='text1'>{postResultObj!==null?postResultObj.total_price:null}MMK</div></TableCell>
            </TableRow>
          </TableBody>

        </Table>
      </Paper>
    </Container>
  );
};

CheckoutConfirm.propTypes = {
   postResultObj: PropTypes.object.isRequired,
};
export default withRouter(CheckoutConfirm);

