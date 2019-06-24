import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, CardContent, CardActions, Button, Link } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const CartTotal = ({totalPrice}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Card>
        <CardContent>
          <Box mt={1} fontSize="h6.fontSize" fontWeight={600}>
            Total {totalPrice} Ks
          </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth={true} variant="contained" color="secondary">
            Confirm Order
          </Button>
        </CardActions>
        <CardContent>
          <Link to="/"
            component={RouterLink}>
            Continue Shopping
          </Link>
        </CardContent>
      </Card>
    </Box>  
  )
}

CartTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}

export default CartTotal
