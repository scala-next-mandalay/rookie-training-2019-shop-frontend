import React from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  margin:'200px'
  
 
}))

const ToolbarSpacer = () => {
  const classes = useStyles();
  return <div className={classes.toolbar}/>
  
 
}

export default ToolbarSpacer
