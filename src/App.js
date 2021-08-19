import React from "react";
import { Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import PrivateRoute from "./PrivateRoute";
import TheContent from "./containers/TheContent";
import AlertSystemPage from "./views/pages/AlertSystemPage/AlertSystemPage";
import ErrorBoundary from "./views/pages/ErrorBoundary";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const ResetPasswordPage = React.lazy(() =>
  import("./views/pages/ResetPasswordPage/ResetPasswordPage")
);

function App() {
  return (
    <React.Suspense fallback={loading}>
      <ErrorBoundary>
        <div>
          <AlertSystemPage />
        </div>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            exact
            path="/reset_password/:token"
            render={(props) => <ResetPasswordPage {...props} />}
          />
          {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />}
          />
          <PrivateRoute>
            <TheContent />
          </PrivateRoute>
        </Switch>
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default App;
