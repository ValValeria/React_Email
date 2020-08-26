import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
  }));


export default function (){
    const classes = useStyles();
    const lists=useCallback(()=>{
      return [{"Main":"/"},{'Send mail':"sendmail"}]
    },[1])
    const [state,updateState]=useState(false);

    return (
   <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>updateState(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            <Link to ="/">
              Schedule
            </Link>
          </Typography> 
        </Toolbar>
      </AppBar>
      <Drawer anchor={"left"} open={state} onClose={()=>updateState(false)}>
          <div className="menu__icon">
          <Button href="#text-buttons" color="primary">
              Menu
          </Button>
          </div>
          <List>
          {
              lists().map((elem)=>{
                  return (
                  <>   
                  <ListItem button key={Math.random()} className={classes.list}>
                       <Link to={ Object.values(elem)[0]}>
                          <ListItemText primary={Object.keys(elem)[0]} />
                       </Link>
                  </ListItem>
                  <Divider/>
                  </>
                  )
              })
          }
          </List>
      </Drawer>
    </div>
    )
}