import React from 'react'
import Header from './Header'
import ItemList from '../containers/ItemList'
import Box from '@material-ui/core/Box'
import ToolbarSpacer from './ToolbarSpacer'

const Shop = () => {
  return (
    
    <Box display="flex" flexDirection="row">
      <Header />
      <Box display="flex" flexDirection="column" pt={3}>
        <ToolbarSpacer />
        <ItemList />
      </Box>
    </Box>
  )
}

export default Shop
