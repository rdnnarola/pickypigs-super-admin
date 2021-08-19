import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAlert } from "../../../redux/actions/alertAction";
import CIcon from "@coreui/icons-react";
import { CAlert } from "@coreui/react";

const AlertSystemPage = () => {
  const dispatch = useDispatch();

  let alertInfo = useSelector((state) => {
    return state.alert;
  });

  return (
    <>
      <section>
        {alertInfo.length > 0 ? (
          <React.Fragment>
            {alertInfo.map((alert, index) => {
              return (
                <React.Fragment key={alert.id}>
                  {/* <div  className={`alert bg-${alert.color} alert-dismissible animated slideInDown fixed-top m-3`}  style={{width:'max-content',left:'unset'}}>
                                            <button className="close" onClick={()=>{dispatch(removeAlert(alert.id))}}>
                                                <CIcon name="cil-x" />
                                            </button>
                                            <p className=" mb-0 text-white" style={{fontSize:16}}></p>
                                        </div> */}
                  <CAlert
                    color={alert.color}
                    className="alert-dismissible animated slideInDown fixed-top"
                    style={{
                      width: "max-content",
                      zIndex: 9999,
                      left: "unset",
                      right: 12,
                      top: 12,
                      marginTop: 54 * index,
                    }}
                  >
                    {alert.message}
                    <button
                      className="close"
                      onClick={() => {
                        dispatch(removeAlert(alert.id));
                      }}
                    >
                      <CIcon name="cil-x" />
                    </button>
                  </CAlert>
                  {/* <div className={`alert alert-${alert.color} alert-dismissible fade show`} role="alert">
                                            <strong>{alert.message}</strong> 
                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div> */}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        ) : null}
      </section>
    </>
  );
};

export default AlertSystemPage;
