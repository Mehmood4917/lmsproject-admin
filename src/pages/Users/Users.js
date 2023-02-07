import React, { lazy } from "react";
import PrivateRoute from "../../components/PrivateRoute";

const AddUserComponent = lazy(() => import("./AddUser"));
const AllUsersComponent = lazy(() => import("./AllUsers"));

const Users = () => {
  return (
    <>
      <PrivateRoute path="/admin/users/add-user" exact component={AddUserComponent} />
      <PrivateRoute path="/admin/users/add-user/:id" component={AddUserComponent} />
      <PrivateRoute path="/admin/users/all-users" component={AllUsersComponent}
      />
    </>
  );
};

export default Users;
