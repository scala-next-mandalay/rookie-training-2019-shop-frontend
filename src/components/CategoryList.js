import React from 'react'
import PropTypes from 'prop-types'
import { Box, List, ListItem, ListItemText } from '@material-ui/core'
import './style.css'

const CategoryList = ({ categories, setCategoryId, handleDrawerClose }) => {
  return (
    <List>
        {categories.map((obj) => (
          <ListItem button key={obj.id} onClick={()=>{
           handleDrawerClose()
            setCategoryId(obj.id)
          }}  >
            <ListItemText>
            <Box fontWeight={600} color='#9A7B66' fontStyle='italic' class='ho'>
              {obj.name}
            </Box>
            </ListItemText>
          </ListItem>
        ))}
      </List>
  )
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  setCategoryId: PropTypes.func,
  handleDrawerClose: PropTypes.func,
}

export default CategoryList
