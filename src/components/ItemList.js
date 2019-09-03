import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Item from '../containers/Item';
import InfiniteScroll from 'react-infinite-scroller';
import ItemPropTypes from './ItemPropTypes';


const ItemList = ({ items, fetchItems, noMoreFetch }) => {
  return (
   
    <InfiniteScroll
        pageStart={0}
        loadMore={fetchItems}
        hasMore={!noMoreFetch}
        initialLoad={true}
        loader={<div className="loader" key={0}></div>}
    >
    
      <Box maxWidth={1300}  justify="center" mx="auto">
        <Grid container>{
          items.map(item => (
            <Grid key={item.id} item xs={12} sm={4} lg={4} md={4}>
              <Item key={item.id} row={item} />
            </Grid>
        
          ))
        }</Grid>
      </Box>
      
    
      
    </InfiniteScroll>
 
  );
};
ItemList.propTypes = {
  items: PropTypes.arrayOf(ItemPropTypes.isRequired).isRequired,
  fetchItems: PropTypes.func,
  noMoreFetch: PropTypes.bool.isRequired,
};

export default ItemList;