import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { ImBook } from "react-icons/im";
import { BrowserRouter as Router, Switch, Route,Routes } from "react-router-dom";
import { Header, Main, Footer } from "./components/layout";
import { NavBar, NavItem, NavLink } from "./components/navbar";
import Spinner from "./components/spinner";

import { SPINNER, DASHBOARD } from "./shared/routes";

const Dashboard = React.lazy(() => import("./containers/Dashboard/index"));
const Error404 = React.lazy(() => import("./containers/404"));

let routes = (
<Routes>
          <Route path="/DASHBOARD" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
          <Route element={<Error404/>} />
        </Routes>
);

function App() {
  const theme = {
    primary: {
      main: "#29b6f6",
      light: "#dcf3fa",
      dark: "#0086c3",
      TextColor: "#000",
      danger: "#e91e63",
      dangerDark: "#8c0101",
    },
    secondary: {
      main: "#9e9e9e",
      light: "#cfcfcf",
      dark: "#707070",
      TextColor: "#fff",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <NavBar>
          <NavItem>
            <NavLink href="/">
              <ImBook />
            </NavLink>
          </NavItem>
          
        </NavBar>
      </Header>
      <Main>
        <Suspense fallback={<Spinner msg="Loading.." />}>
          <Router> {routes} </Router>
        </Suspense>
      </Main>
     
    </ThemeProvider>
  );
}
export default App;