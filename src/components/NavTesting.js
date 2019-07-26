import React from 'react';
import PropTypes from 'prop-types';
import { Box} from '@material-ui/core';
import "./style.css";
import Hidden from "@material-ui/core/Hidden";

const NavTesting = ({ categories, setCategoryId, handleDrawerClose }) => {
    // const classes = useStyles()
  return (
      <Hidden only={["sm", "xs","md"]}>
         <Box display="flex" flexDirection="row" p={1} m={1} >
        {categories.map((obj) => (
          <Box button key={obj.id} onClick={()=>{
            // handleDrawerClose()
            setCategoryId(obj.id);
          }}  >
                        <div style={{ width: '100%' }}>
            <Box display="flex" flexDirection="row" p={1} m={1}>
             <Box p={1} bgcolor="none" marginLeft="3px" color="#000000" class="ho">
                    {obj.name}
                </Box>
       
             </Box>
            </div>
            
          </Box>
        ))}
      </Box>
      </Hidden>
  );
};

NavTesting.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  setCategoryId: PropTypes.func,
  handleDrawerClose: PropTypes.func,
};

export default NavTesting;
