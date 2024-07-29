import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { mode, isAuthenticated } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        setLoading(true);
        console.log("Fetching blog with id:", id); 
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/blog/singleblog/${id}`,
          { withCredentials: true }
        );
        setBlog(data.blog);
      } catch (error) {
        setError("Failed to fetch blog");
        console.log("Error fetching blog:", error); 
      } finally {
        setLoading(false);
      }
    };
    getSingleBlog();
  }, [id]);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <article
      className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}
    >
      {blog ? (
        <section className="container">
          <div className="category">{blog.category}</div>
          <h1>{blog.title}</h1>
          <div className="writer_section">
            <div className="author">
              <img src={blog.authorAvatar || '/path/to/default-avatar.png'} alt="author_avatar" />
              <p>{blog.authorName || 'Unknown author'}</p>
            </div>
          </div>
          {blog.mainImage && blog.mainImage.url ? (
            <img src={blog.mainImage.url} alt="mainBlogImg" className="mainImg" />
          ) : (
            <img src="/path/to/default-image.png" alt="default_main_img" className="mainImg" />
          )}
          <p className="intro-text">{blog.intro || 'No introduction'}</p>
          <div className="sub-para">
            <h3>{blog.paraOneTitle || 'No title'}</h3>
            {blog.paraOneImage && blog.paraOneImage.url ? (
              <img src={blog.paraOneImage.url} alt="paraOneImg" />
            ) : (
              <img src="/path/to/default-image.png" alt="default_paraOne_img" />
            )}
            <p>{blog.paraOneDescription || 'No description'}</p>
          </div>
          <div className="sub-para">
            <h3>{blog.paraTwoTitle || 'No title'}</h3>
            {blog.paraTwoImage && blog.paraTwoImage.url ? (
              <img src={blog.paraTwoImage.url} alt="paraTwoImg" />
            ) : (
              <img src="/path/to/default-image.png" alt="default_paraTwo_img" />
            )}
            <p>{blog.paraThreeDescription || 'No description'}</p>
          </div>
          <div className="sub-para">
            <h3>{blog.paraThreeTitle || 'No title'}</h3>
            <p>{blog.paraThreeDescription || 'No description'}</p>
            {blog.paraThreeImage && blog.paraThreeImage.url ? (
              <img src={blog.paraThreeImage.url} alt="paraThreeImg" />
            ) : (
              <img src="/path/to/default-image.png" alt="default_paraThree_img" />
            )}
          </div>
        </section>
      ) : (
        <p>No blog data available.</p>
      )}
    </article>
  );
};

export default SingleBlog;
