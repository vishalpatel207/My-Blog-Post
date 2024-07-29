import axios from "axios";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const PopularAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/authors",
          { withCredentials: true }
        );
        setAuthors(data.authors);
      } catch (error) {
        console.error("Error fetching authors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <section className="popularAuthors">
      <h3>Popular Authors</h3>
      <div className="container">
        {loading ? (
          <BeatLoader color="gray" size={30} />
        ) : authors && authors.length > 0 ? (
          authors.slice(0, 4).map((element) => (
            <div className="card" key={element._id}>
              <img src={element.avatar?.url || "/default-avatar.jpg"} alt="author" />
              <p>{element.name}</p>
              <p>{element.role}</p>
            </div>
          ))
        ) : (
          <p>No authors found</p>
        )}
      </div>
    </section>
  );
};

export default PopularAuthors;
