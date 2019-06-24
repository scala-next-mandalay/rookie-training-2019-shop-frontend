import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Paper, CardMedia, Divider, Hidden } from '@material-ui/core'
import { BASEURL_ITEM_IMAGES } from '../constants'
import QuantitySelect from '../containers/QuantitySelect'
import CartItemPropTypes from './CartItemPropTypes'
import DeleteCartItemLink from '../containers/DeleteCartItemLink'
const uuidv1 = require('uuid/v1');

const useStyles = makeStyles(theme => ({
  gridRow: {
    padding: theme.spacing(2),
  },
  gridCell: {
    display: 'flex',
  },
  imagePC: {
    width: 50,
    height: 64
  },
  imageMobile: {
    height: 0,
    paddingTop: '128%',
  },
  paperMobile: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const CartTable = ({ cart }) => {
  const classes = useStyles()
  
  const addDivider = (rows) => {
    rows.push(<Grid key={uuidv1()} item xs={12}><Divider /></Grid>)
  }

  //componet list for PC
  const tableRows = [] //for PC
  tableRows.push(
    <Grid key={uuidv1()} container className={classes.gridRow}>
      <Grid item xs={4} className={classes.gridCell}>
        <Box ml={0} my="auto" flexGrow={1}>Desc</Box>
      </Grid>
      <Grid item xs={2} className={classes.gridCell}>
        <Box ml="auto" mr={0} my="auto">@ (Ks)</Box>
      </Grid>
      <Grid item xs={2} className={classes.gridCell}>
        <Box ml="auto" mr={0} my="auto">Qty.</Box>
      </Grid>
      <Grid item xs={2} className={classes.gridCell}>
        <Box ml="auto" mr={0} my="auto">Price (Ks)</Box>
      </Grid>
      <Grid item xs={2} className={classes.gridCell} />
    </Grid>
  )
  addDivider(tableRows)

  //componet list for Mobile
  const paperRows = [] //for Mobile

  //loop per cartItem
  cart.forEach((row, i) => {
    //rows for PC
    tableRows.push(
      <Grid container key={row.id} className={classes.gridRow}>
        <Grid item xs={4} className={classes.gridCell}>
          <CardMedia
            className={classes.imagePC}
            image={BASEURL_ITEM_IMAGES+row.image}
            title={row.name}
          />
          <Box ml={2} my="auto" fontWeight={600}>
            {row.name}
          </Box>
        </Grid>
        <Grid item xs={2} className={classes.gridCell}>
          <Box my="auto" ml="auto" mr={0}>
            {row.price}
          </Box>
        </Grid>
        <Grid item xs={2} className={classes.gridCell}>
          <Box my="auto" ml="auto" mr={0}>
            <QuantitySelect id={row.id} quantity={row.quantity} />
          </Box>
        </Grid>
        <Grid item xs={2} className={classes.gridCell}>
          <Box my="auto" ml="auto" mr={0} fontWeight={600}>
            {row.subTotal}
          </Box>
        </Grid>
        <Grid item xs={2} className={classes.gridCell}>
          <Box m="auto">
            <DeleteCartItemLink id={row.id} />
          </Box>
        </Grid>
      </Grid>
    )
    
    //Add devider except last item.
    if (i + 1 < cart.length) {
      addDivider(tableRows)
    }

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
          <Box ml={2} display="flex" flexDirection="column" height="100%">
            <Box fontWeight={600} ml={0} my="auto">
              {row.name}
            </Box>
            <Box display="flex" my={1} flexDirection="row">
              <Box fontWeight={600} textAlign="left" >
                {row.subTotal} Ks
              </Box>
              <Box ml="auto" mr={2}>
                <DeleteCartItemLink id={row.id} />
              </Box>
            </Box>
            <Box display="flex" my={1} flexDirection="row">
              <QuantitySelect id={row.id} quantity={row.quantity} />
              <Box textAlign="left">
                @{row.price} Ks
              </Box>
            </Box>
          </Box>
        </Grid>
      </Paper>
    )
  })
  
  

  return (
    <React.Fragment>
      <Hidden smUp implementation="css">
      {paperRows}  
      </Hidden>
      <Hidden xsDown implementation="css">
        <Paper>{tableRows}</Paper>
      </Hidden>
    </React.Fragment>
  )
}

CartTable.propTypes = {
  cart: PropTypes.arrayOf(CartItemPropTypes.isRequired).isRequired,
}

export default CartTable;
