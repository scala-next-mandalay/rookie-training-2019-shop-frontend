import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Item from '../containers/Item'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroller'

const useStyles = makeStyles(theme => ({
  girdContainer: {
    maxWidth: 1800,
  },
}))

const ItemList = ({ items, fetchAllItems, noMoreFetch }) => {
  const classes = useStyles()
  return (
    <InfiniteScroll
        pageStart={0}
        loadMore={fetchAllItems}
        hasMore={!noMoreFetch}
        initialLoad={true}
        loader={<div className="loader" key={0}></div>}
    >
      <Grid container className={classes.girdContainer}>{
        items.map(item => (
          <Grid key={item.id} item xs={12} sm={4} lg={3}>
            <Item
              key={item.id}
              row={item}
            />
        </Grid>
        ))
      }</Grid>
      </InfiniteScroll>
  )
}

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired).isRequired,
  fetchAllItems: PropTypes.func,
  noMoreFetch: PropTypes.bool.isRequired,
}

export default ItemList