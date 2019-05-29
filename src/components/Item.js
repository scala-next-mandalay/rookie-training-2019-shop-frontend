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

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    margin: theme.spacing(1),
  },
  media: {
    height: 0,
    //paddingTop: '56.25%', // 16:9
    paddingTop: '62%',
  },
}));

const Item = ({ name, price, image, category_id }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={BASEURL_ITEM_IMAGES+image}
          title="{name}"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {name}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
  )
}

Item.propTypes = {
  name: PropTypes.string.isRequired
}

export default Item
