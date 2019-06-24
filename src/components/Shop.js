import React from 'react'
import { Box } from '@material-ui/core'
import Header from './Header'
import ItemList from '../containers/ItemList'
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
