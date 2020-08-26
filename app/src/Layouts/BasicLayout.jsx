import React from 'react'

export  function BasicLayout(props){
    return (
            <div className="section__area">
                <div className="section__wrap">
                    <div className="section__content">
                        {[props.children]}
                    </div>
                </div>
            </div>
    )
}