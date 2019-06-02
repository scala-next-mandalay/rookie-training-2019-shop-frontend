import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import { BASEURL_ITEM_IMAGES } from '../constants'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import QuantitySelect from '../containers/QuantitySelect'

const useStyles = makeStyles(theme => ({
  container: {
    overflowX: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  tableCellData: {
    textAlign: 'center',
  },
  tableCellHeader: {
    textAlign: 'left',
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

const CartTable = ({ cart, deleteCartItem }) => {
  const classes = useStyles()

  const tableRows = []
  for (const row of cart) {
    tableRows.push(
      <TableRow key={row.id}>
        <TableCell>
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
        <TableCell>{row.price}</TableCell>
        <TableCell>
          <QuantitySelect id={row.id} quantity={row.quantity} />          
        </TableCell>
        <TableCell>{row.price * row.quantity}</TableCell>     
        <TableCell>
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
    )
  }

  return (
    <Paper className="container">
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price (Ks)</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Total (Ks)</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </Paper>
  )
}

CartTable.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  deleteCartItem: PropTypes.func,
}

export default CartTable;
