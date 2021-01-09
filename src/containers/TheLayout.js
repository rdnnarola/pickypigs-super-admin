import React, { lazy } from "react";
import { withRouter } from "react-router-dom";

const TheSidebar = lazy(() => import('./TheSidebar'));
const TheHeader = lazy(() => import('./TheHeader'));
const TheFooter = lazy(() => import('./TheFooter'));

const TheLayout = (props) => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
                <section >
                    {props.children}
                </section>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default withRouter(TheLayout);
