import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { BASEURL_ITEM_IMAGES } from '../constants'
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
  buttonText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 10
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 14
    },
  }
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
          <Typography variant="h6" component="h2">
            {row.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {row.price} Ks
          </Typography>
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
  name: PropTypes.string.isRequired
}

export default Item
