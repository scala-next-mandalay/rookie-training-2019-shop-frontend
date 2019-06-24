import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Grid, Container, Hidden } from '@material-ui/core'
import CartTable from '../containers/CartTable'
import CartTotal from '../containers/CartTotal'
import TitleBar from '../containers/TitleBar'
import ToolbarSpacer from './ToolbarSpacer'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
  },
  gridCartTable: {
    display: 'flex',
  }
}))

const Cart = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <TitleBar />
      <ToolbarSpacer />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container>
          <Grid item xs={12} sm={12} md={9} className={classes.gridCartTable}>
            <Box flexGrow={1}>
              <CartTable/>
            </Box>
            <Hidden smDown>
              <Box mx={1} />
            </Hidden>
          </Grid>
          <Hidden mdUp>
            <Grid item xs={12}><Box my={2} /></Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={3}>
            <CartTotal/>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Cart
