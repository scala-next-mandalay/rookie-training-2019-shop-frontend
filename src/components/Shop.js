import React from 'react';
import { Box ,Grid} from '@material-ui/core';
import Header from './Header';
import bg from '../assets/Images/bg1.png';
import ItemList from '../containers/ItemList';
import '../assets/style.css';

const Shop = () => {
  return (
    <Box display="flex" flexDirection="row">
      <Header />
      <Box display="flex" flexDirection="column" className="responsive-image">
        <Grid container>
        <Grid item xs={12} sm={12}></Grid>
         <img src={bg}  alt="Shop Happy " className="responsive-image__image"/>
         <div className="text">
            <h1>Welcome to .....</h1>
          </div>
        </Grid>
         <Box>
         <ItemList />
         </Box>
      </Box>
    </Box>
  );
};

export default Shop;
