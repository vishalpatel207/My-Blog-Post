import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const AllAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const { mode } = useContext(Context);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/authors",
          { withCredentials: true }
        );
        setAuthors(data.authors || []); // Ensure authors is always an array
      } catch (error) {
        console.error('Error fetching authors:', error);
        setAuthors([]);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <article
      className={
        mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"
      }
    >
      <h2>ALL AUTHORS</h2>
      <div className="container">
        {authors.length > 0 ? (
          authors.map((element) => (
            <div className="card" key={element._id}>
              {element.avatar && element.avatar.url ? (
                <img
                  src={element.avatar.url}
                  alt="author_avatar"
                  onError={(e) => (e.target.src = "/path/to/default-avatar.png")}
                />
              ) : (
                <img
                  src="/path/to/default-avatar.png"
                  alt="default_avatar"
                />
              )}
              <h3>{element.name}</h3>
              <p>{element.role}</p>
            </div>
          ))
        ) : (
          <BeatLoader color="gray" size={50} style={{ padding: "200px 0" }} />
        )}
      </div>
    </article>
  );
};

export default AllAuthors;
