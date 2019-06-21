import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box'
import { BASEURL_ITEM_IMAGES } from '../constants'
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    //paddingTop: '56.25%', // 16:9
    paddingTop: '128%',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  cardContentArea: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  cardActionArea: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const Item = ({ addCartItem, row }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={BASEURL_ITEM_IMAGES+row.image}
        //image={"http://127.0.0.1/dummyImage.jpg"}
        title={row.name}
      />
      <CardContent className={classes.cardContentArea}>
        <Box fontWeight={600}>
          {row.name}
        </Box>
        <Box>
          Price: {row.price} Ks
        </Box>
      </CardContent>
      <CardActions className={classes.cardActionArea}>
        <Button 
          variant="outlined" 
          fullWidth 
          color="primary"
          onClick={()=>{
            addCartItem(row)
          }}
        >
          Add to Cart
          <AddShoppingCartIcon className={classes.rightIcon} />
        </Button>
      </CardActions>
    </Card>
  )
}

Item.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
  addCartItem: PropTypes.func,
}

export default Item
