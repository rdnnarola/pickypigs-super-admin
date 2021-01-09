import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PublicRoute({ children, ...rest }) {
  const token = !!localStorage.getItem("access_token");
  // const email = localStorage.getItem("isEmailVerified");
  // const role = localStorage.getItem("role");

  // if (rest.path === "/events") {
  //   return children;
  // }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}



// function PublicRoute({ component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         token ? (
//           <Redirect
//             to={{
//               pathname: "/dashboard",

//             }}
//           />
//         ) : (
//           React.createElement(component, props)
//         )
//       }
//     />
//   );
// }



// token ? (
//   <Redirect
//     to={{
//       pathname: "/expert",
//       state: { from: location },
//     }}
//   />
// ) : token && role === "attendee" ? (
//   <Redirect
//     to={{
//       pathname: "/dashboard",
//       state: { from: location },
//     }}
//   />
// ) : (
//   children
// )