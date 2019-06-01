import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {FormattedMessage} from 'react-intl'
import { BASEURL_ITEM_IMAGES } from '../constants'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';




const useStyles = makeStyles(theme => ({
  container: {
    overflowX: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  tableCell: {
    textAlign: 'right',
  },
  thumbnail: {
    width: 75,
    height: 96
  },
  card: {
    display: 'flex',
  },
  cardTitle: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    marginLeft: theme.spacing(2),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const Cart = ({ cart, maxQuantity, changeQuantity, deleteCartItem }) => {
  const classes = useStyles()

  const qtyOptions = []
  for (let i = 1; i <= Math.max(20, maxQuantity); i++) {
    qtyOptions.push(
      <option value={i}>{i}</option>
    )
  }

  return (
    <React.Fragment>
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          <FormattedMessage id="Top.Title" />
        </Typography>
      </Toolbar>
    </AppBar>

<Container maxWidth="md">
<Paper className="container">
  <Table className={classes.table}>
    <TableHead>
      <TableRow>
         <TableCell className={classes.tableCell}>Product</TableCell>
         <TableCell className={classes.tableCell}>Price (Ks)</TableCell>
         <TableCell className={classes.tableCell}>Qty</TableCell>
         <TableCell className={classes.tableCell}>Total (Ks)</TableCell>
         <TableCell className={classes.tableCell}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {cart.map(row => (
        <TableRow key={row.id}>
           <TableCell className={classes.tableCell}>
            <div className={classes.card}>
              <CardMedia
                className={classes.thumbnail}
                image={BASEURL_ITEM_IMAGES+row.image}
                //image={"http://127.0.0.1/dummyImage.jpg"}
                title={row.name}
              />
              <Box className={classes.cardTitle}>
                {row.name}
              </Box>
            </div>
          </TableCell>
          <TableCell className={classes.tableCell}>{row.price}</TableCell>
          <TableCell className={classes.tableCell}>
          





<NativeSelect
  value={row.quantity}
  onChange={(event) => changeQuantity(row.id, event.target.value)}
  //input={<Input name="age" id="age-native-helper" />}
>
  {qtyOptions}
</NativeSelect>





          
          </TableCell>
          <TableCell className={classes.tableCell}>{row.price * row.quantity}</TableCell>     
          <TableCell className={classes.tableCell}>
            <Button 
              variant="contained" 
              size="small" 
              className={classes.button}
              onClick={()=> deleteCartItem(row.id)}
            >
              Delete
              <DeleteIcon className={classes.rightIcon} />
            </Button>         
          </TableCell>    

           
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Paper>
</Container>
    </React.Fragment>
  );
}

export default Cart;
