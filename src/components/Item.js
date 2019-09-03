import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import { BASEURL_ITEM_IMAGES } from '../constants';
import { AddShoppingCart as AddShoppingCartIcon } from '@material-ui/icons';
import '../assets/style.css';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: theme.spacing(2),
    border:'1px solid #9A7B66'
   
  },
  media: {
    height: 0,
    paddingTop: '128%',
  },
  cardContent: {
    margin: theme.spacing(1),
  },
  cardActions: {
    margin: theme.spacing(1),
  },
}));

const Item = ({ addCartItem, row }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={BASEURL_ITEM_IMAGES+row.image}
        title={row.name}
      />
      <CardContent className={classes.cardContent}>
        <Box fontWeight={600} className="nameTxt">
         Name:{row.name}
        </Box>
        <Box className="priceTxt">
        Price:{row.price}Ks
       
        </Box>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button 
          variant="outlined" 
          fullWidth 
          color="primary"
          onClick={()=>{
            addCartItem(row);
          }}
        >
          <Box mr={1}><FormattedMessage id="Button.Add" defualtMessage="Add Button" /></Box>
          <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
};


export default Item;
