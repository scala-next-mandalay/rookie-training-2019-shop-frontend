import React from 'react'
import PropTypes from 'prop-types'
import Item from '../containers/Item'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import InfiniteScroll from 'react-infinite-scroller'
import ItemPropTypes from './ItemPropTypes'

const ItemList = ({ items, fetchAllItems, noMoreFetch }) => {
  return (
    <InfiniteScroll
        pageStart={0}
        loadMore={fetchAllItems}
        hasMore={!noMoreFetch}
        initialLoad={true}
        loader={<div className="loader" key={0}></div>}
    >
      <Box maxWidth={1400}>
        <Grid container>{
          items.map(item => (
            <Grid key={item.id} item xs={12} sm={4} lg={3}>
              <Item key={item.id} row={item} />
            </Grid>
          ))
        }</Grid>
      </Box>
    </InfiniteScroll>
  )
}

ItemList.propTypes = {
  items: PropTypes.arrayOf(ItemPropTypes.isRequired).isRequired,
  fetchAllItems: PropTypes.func,
  noMoreFetch: PropTypes.bool.isRequired,
}

export default ItemList