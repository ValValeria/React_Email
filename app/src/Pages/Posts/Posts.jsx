import React from 'react';
import mainStore from '../../Context/data'
import {BasicLayout} from '../../Layouts/BasicLayout'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import {range} from "lodash"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    width: 300,
  },
});


export default class extends React.PureComponent{

    constructor(props){
        super(props)
        this.state={
            posts:[],
            classes:{}
        }
    }

    componentDidMount(){
       if(mainStore.user.isLogged && mainStore.user.id){
           mainStore.request('http://localhost:8000/userSchedule/?id='+mainStore.user.id)
           .subscribe((v)=>{
               console.log(v.xhr.responseText)
               this.setState({
                   classes:useStyles()
               })
           })
       } else {
           console.log(mainStore.user)
       }
    }

    render(){
        return (
            <section >
            <BasicLayout>
                <div className="section__content-wrap ">
                <div className="section__content-main flex_center flex_cl txt_center">
                    <h5>Your schedule <span>🚀</span></h5>
                    <br/>
                     <div className="section__items">
                       { 
                           !this.state.posts.length &&
                           range(0,3,1).map(v=>{
                               return (
                              <div className={this.state.classes.root} key={v}>
                                <Skeleton className={this.state.classes.root}  />
                                <Skeleton animation={false} className={this.state.classes.root} />
                                <Skeleton animation="wave" className={this.state.classes.root}  />
                                <Skeleton animation="wave" className={this.state.classes.root}  />
                                <Skeleton animation="wave" className={this.state.classes.root}  />
                              </div>
                               )
                           })
                       }
                       {
                           this.state.posts.map(v=>(
<Card >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {v.date}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {v.message}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
                           ))
                       }
                     </div>
                 </div>
                </div>
            </BasicLayout>
          </section>
        );
    }
}