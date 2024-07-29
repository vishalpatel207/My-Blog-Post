import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // To handle the loading state
  const [error, setError] = useState(null); // To handle the error state

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/blog/myblogs",
          { withCredentials: true }
        );
        setMyBlogs(data.blogs);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, []);

  const deleteBlogHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/blog/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="my-blogs">
      {myBlogs.length > 0 ? (
        myBlogs.map((element) => (
          <div className="author-blog-card" key={element._id}>
            {element.mainImage && (
              <img src={element.mainImage.url} alt="blogImg" />
            )}
            <span className="category">{element.category}</span>
            <h4>{element.title}</h4>
            <div className="btn-wrapper">
              <Link to={`/blog/update/${element._id}`} className="update-btn">
                UPDATE
              </Link>
              <button
                className="delete-btn"
                onClick={() => deleteBlogHandler(element._id)}
              >
                DELETE
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>You have not posted any blog!</p>
      )}
    </section>
  );
};

export default MyBlogs;
