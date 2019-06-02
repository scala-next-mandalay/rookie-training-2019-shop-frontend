import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const CategoryList = ({ categories, setCategoryId, handleDrawerClose }) => {
  return (
    <List>
        {categories.map((obj) => (
          <ListItem button key={obj.id} onClick={()=>{
            handleDrawerClose()
            setCategoryId(obj.id)
          }}  >
            <ListItemText>
            <Typography variant="h6" noWrap>
              {obj.name}
            </Typography>
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
