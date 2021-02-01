import React,{setState, useState} from "react";
import {useSelector} from "react-redux";



const AlertSystemPage=()=>{

    let alertInfo = useSelector((state) => {
        return state.alert;
    });

    
    return(
        <>
        <section >
            {
                alertInfo.length > 0 ?
                    <React.Fragment>
                        {
                            alertInfo.map(alert => {
                                return (
                                    <React.Fragment key={alert.id}>
                                        <div  className={`alert bg-${alert.color} alert-dismissible animated slideInDown fixed-top m-3`}  style={{width:'max-content',left:'unset'}}>
                                            <button className="close">
                                                <i className="fa fa-times-circle"/>
                                            </button>
                                            <p className=" mb-0 text-white" style={{fontSize:16}}>{alert.message}</p>
                                        </div>
                                        {/* <div class={`alert alert-${alert.color} alert-dismissible fade show`} role="alert">
                                            <strong>{alert.message}</strong> 
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div> */}
                                       
                                    </React.Fragment>
                                )
                            })
                        }

                         
                    </React.Fragment> : null
            }
           
        </section>
        </>
    )
}

export default AlertSystemPage;