import { useState, useEffect, Dispatch } from "react";
import { Layout } from "antd";
import Topbar from "../Topbar";
import AdminSideBar from "../sidebar/AdminSideBar";
import { setUser } from "../../redux/actions/setUserAction";
import { User } from "../../models/user";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";


const { Content } = Layout;
const AdminLayout = (props: any) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user");

        props.setUser(
          new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.role
          )
        );
      } catch (e) {
        setRedirect(true);
      }
    })();
  }, []);
  if (redirect) {
    return <Navigate to="/login"/>
}

  return (
    <Layout>
      <Topbar />
      <Layout>
        <AdminSideBar />
        <Layout>
          <Content style={{ padding: "10px" }}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setUser: (user: User) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
