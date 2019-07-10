import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paper,Grid} from '@material-ui/core'
import "./style.css"
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  gridPaper: {
   backgroundColor: '#f2f2f2',
  
  
   
  },
  gridTotalPrice :{
    backgroundColor: '#fff',
    borderRadius:'2px',
    border : '1px solid #f2f2f2',
    marginRight: '40px',
    textAlign:'center'
  }
}))
const TotalOrder = ({totalPrice}) => {
   const classes = useStyles()
  return (
    <Box display="flex" flexDirection="column" marginTop="20px" backgroundColor="#f2f2f2">
    
      <Paper className={classes.gridPaper}>
      
          <Box  mt={1} mb={1} fontSize="h6.fontSize" textAlign="right" className="nameTxt" mr={0} display="flex">
           
          <Grid item xs={8} sm={8}> Total :</Grid> <Grid item xs={4} sm={4} className={classes.gridTotalPrice}> {totalPrice}Ks</Grid>

           
          </Box>
        
        </Paper>
    </Box>  
  )
}

TotalOrder.propTypes = {
  totalPrice: PropTypes.number.isRequired,
}

export default TotalOrder
