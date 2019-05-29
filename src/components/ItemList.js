import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Item from './Item'
import Grid from '@material-ui/core/Grid'
import InfiniteScroll from 'react-infinite-scroller'

const useStyles = makeStyles(theme => ({
  girdContainer: {
    maxWidth: 1500,
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
        loader={<div className="loader" key={0}>Loading ...</div>}
    >
      <Grid container className={classes.girdContainer}>{
        items.map(item => (
          <Grid key={item.id} item xs={12} sm={4}>
            <Item
            key={item.id}
            {...item}
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
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
}

export default ItemList