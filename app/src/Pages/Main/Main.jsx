import React from 'react'
import {BasicLayout} from '../../Layouts/BasicLayout'
import { Button } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom'


export default function (props){
    return (
        <section className="main__banner">
          <BasicLayout>
              <div className="section__content-wrap ">
              <div className="section__content-main flex_center flex_cl txt_center">
                  <h5>Schedule your time <span>🚀</span></h5>
                  <p>All features are free. No payment</p>
                  <div className="buttons">
                      <Button color="primary" variant="contained" >
                         <Link to="/sendmail">Try it now</Link>
                      </Button>
                      <button className="btn_beauty" title="Under development" disabled>
                          <svg viewBox="0 0 24 24" ><path fill="#4E5D78" d="M17.8436076,12.841119 L8.54075759,18.8215226 C8.07618755,19.1201747 7.4574737,18.9856717 7.15882152,18.5211017 C7.05513038,18.3598044 7,18.1720957 7,17.9803441 L7,6.01953696 C7,5.46725221 7.44771525,5.01953696 8,5.01953696 C8.19175162,5.01953696 8.37946026,5.07466734 8.54075759,5.17835848 L17.8436076,11.1587621 C18.3081776,11.4574142 18.4426806,12.0761281 18.1440285,12.5406981 C18.0665625,12.6612008 17.9641102,12.763653 17.8436076,12.841119 Z"></path></svg>
                          <span>See how it works</span>
                      </button>
                  </div>
              </div>
              <div className="chips pos_abs">
              <Chip
        avatar={<Avatar>F</Avatar>}
        label="Everything is free"
        clickable
        color="primary"
      />
            <Chip
        avatar={<Avatar>E</Avatar>}
        label="Everything is Easy"
        clickable
        color="primary"
      />
            <Chip
        avatar={<Avatar>R</Avatar>}
        label="All information is reserved "
        clickable
        color="primary"
      />
              </div>
              </div>
          </BasicLayout>
        </section>
    )
}