import React, { useContext } from "react";
import LatestBlogs from "../miniComponents/LatestBlogs";
import { Context } from "../../main";

const Blogs = () => {
  const { mode, blogs } = useContext(Context);

  console.log("Current mode:", mode);
  console.log("Blogs data:", blogs);

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <LatestBlogs blogs={blogs} title={"Blogs"} />
    </article>
  );
};

export default Blogs;
