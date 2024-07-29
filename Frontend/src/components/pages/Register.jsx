import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const changeAvatarHandler = (e) => {
    const file = e.target.files?.[0];
    
    if (file && file instanceof Blob) { // Check if file is not undefined and is a Blob
      const reader = new FileReader();
      
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(file);
      };
      
      reader.onerror = () => {
        toast.error("Failed to read file");
      };

      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file");
    }
  };

  const { mode, isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("education", education);
    formData.append("role", role);
    if (avatar) formData.append("avatar", avatar); // Only append if avatar exists

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      setName("");
      setEmail("");
      setEducation("");
      setPassword("");
      setPhone("");
      setRole("");
      setAvatar(null);
      setAvatarPreview("");
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handleRegister}>
          <h1>REGISTER</h1>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">SELECT ROLE</option>
            <option value="Reader">READER</option>
            <option value="Author">AUTHOR</option>
          </select>
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="">SELECT YOUR EDUCATION</option>
            <option value="Matric">Matric</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Graduation">Graduation</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div className="avatar">
              <img
                src={avatarPreview || "/pic.jpg"}
                alt="avatar"
              />
            </div>
            <input
              type="file"
              accept="image/*" // Ensure only image files are accepted
              onChange={changeAvatarHandler}
              className="avatar_input_tag"
              style={{ border: "none" }}
            />
          </div>
          <p>
            Already Registered? <Link to="/login">Login Now</Link>
          </p>
          <button className="submit-btn" type="submit">
            REGISTER
          </button>
        </form>
      </section>
      <Toaster />
    </article>
  );
};

export default Register;
