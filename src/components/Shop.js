import React from 'react'
import { Box } from '@material-ui/core'
import Header from './Header'
import bg from './bg1.png';
import ItemList from '../containers/ItemList'
import './style.css'






const Shop = () => {
  return (
    <Box display="flex" flexDirection="row">
    
      <Header />
     
      <Box display="flex" flexDirection="column" class="responsive-image">
      
        <Box>
         <img src={bg}  alt="Shop Happy " containerFluid class="responsive-image__image"/>
           <div class="text">
            <h1>Welcome to .....</h1>
           </div>
        </Box>
       
        
        
    
         <Box>
         <ItemList />
         </Box>
        
      </Box>
     
    </Box>
  )
}

export default Shop
