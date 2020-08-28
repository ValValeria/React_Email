import React,{useState,useEffect} from 'react';
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
import { interval } from 'rxjs';
import {take} from 'rxjs/operators';
import mainStore from '../Context/data'

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
      const data = [{"Main":"http://localhost:3000"}]
      
      setTimeout(()=>{
        if (!mainStore.user.isLogged) {
          data.push({"Login":"/login"},{"Sign up":"/signup"})
        } 
      },2000)
  
      data.push({'Send mail':"/sendmail"},{"Your schedule":"/posts"});
  
      return data;
    })

    const [mylist,update] = useState(lists())

    useEffect(()=>{
      interval(1000)
      .pipe(
         take(3)
      ).subscribe((v)=>{
         const data = lists();

         if(data !==  mylist){
           update(data)
         }
      })
    })

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
              mylist.map((elem)=>{
                  return (
                  <>   
                <Link to={ Object.values(elem)[0]} className="links">
                  <ListItem button key={Math.random()} className={classes.list}>
                          <ListItemText primary={Object.keys(elem)[0]} />
                  </ListItem>
                </Link>
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