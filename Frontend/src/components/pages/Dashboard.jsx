import React, { useContext, useState, useEffect } from "react";
import SlideBar from "../layout/SlideBar";
import MyBlogs from "../miniComponents/MyBlogs";
import MyProfile from "../miniComponents/MyProfile";
import CreateBlog from "../miniComponents/CreateBlog";
import Chart from "../miniComponents/Chart";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const [userData, setUserData] = useState(null);
  const { mode, isAuthenticated } = useContext(Context);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/myprofile", {
          withCredentials: true,
        });
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError("Failed to fetch user data. Please try again later.");
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SlideBar component={component} setComponent={setComponent} />
      {error && <p className="error-message">{error}</p>}
      {component === "My Profile" ? (
        <MyProfile user={userData} />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Analytics" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;
