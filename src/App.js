import { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";

const AdminComponent = lazy(() => import("./pages/Admin/Admin"));
const AuthComponent = lazy(() => import("./pages/Auth/Auth"));

function App() {
  return (
    <Suspense fallback={() => <div>Loading ....</div>}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              if (localStorage.getItem("token")) {
                return <Redirect to="/admin" />;
              } else {
                return <Redirect to="/auth" />;
              }
            }}
          />
          <Route path="/auth" component={AuthComponent} />
          <PrivateRoute path="/admin" component={AdminComponent} />
          <PrivateRoute path="*" component={AdminComponent} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
