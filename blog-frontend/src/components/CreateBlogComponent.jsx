import React, { useState, useEffect } from "react";
import { createBlog, getBlog, updateBlog } from "../services/blogService";
import {
  offlineCreateBlog,
  offlineGetBlog,
  offlineUpdateBlog,
} from "../services/OfflineBlogService";
import { useNavigate, useParams } from "react-router-dom";

const CreateBlogComponent = () => {
  // useState is a hook that lets you add React state to function components.
  // useState returns a pair: the current state value and a function that lets you update it.
  // useState is similar to this.setState in a class, except it doesn’t merge the old and new state together.
  // The only argument to useState is the initial state. In the example above, it is 0 because our counter starts from zero.
  // Note that unlike this.setState in a class, updating a state variable always replaces it instead of merging it.
  // If you want to keep some other values around, you can incorporate them into the state by using separate state variables.
  // Unlike the setState method found in class components, useState does not automatically merge update objects.
  {
    /*{
  "title": "Offlinee First Concept",
  "content": "Offlineeee First Concept is depending Offline",
  "version": 1,
  "author": {
    "id": 1,
    "name": "ankur",
    "email": "ankur@gmail.com"
  }
}*/
  }

  const navigate = useNavigate();
  // below code is for creating a blog

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    authorId: "",
    authorName: "",
    authorEmail: "",
  });
  //
  const [statusColor, setStatusColor] = useState("");

  // function to check internet connectivity
  function checkInternetConnection() {
    return fetch("https://www.google.com/", {
      // You can replace this URL with any that you know will be up
      mode: "no-cors", // 'cors' by default
      cache: "no-store", // 'default' by default
    })
      .then(() => true)
      .catch(() => false);
  }


   async function saveOrUpdateBlog(e) {
     e.preventDefault();
     const isValid = validate();
     if (isValid) {
       const author = {
         id: authorId,
         name: authorName,
         email: authorEmail,
       };
       const blog = {
         title: title,
         content: content,
         author: author,
       };
       console.log(blog);
       const isConnected = await checkInternetConnection(); // Check internet connectivity
       setStatusColor(isConnected ? "green" : "red");

       if (id) {
         const updateBlogService = isConnected ? updateBlog : offlineUpdateBlog;
         // make a put request to the server
         updateBlogService(id, title, content)
           .then((response) => {
             console.log(response.data);
             console.log(response.status);
             navigate("/blogs");
           })
           .catch((e) => {
             console.log(e);
           });
       } else {
         // make a post request to the server
         const createBlogService = isConnected ? createBlog : offlineCreateBlog;
         createBlogService(blog)
           .then((response) => {
             console.log(response.data);
             console.log(response.status);
             navigate("/blogs");
           })
           .catch((e) => {
             console.log(e);
           });
       }
     }
   }
  // useParams is a hook that returns an object of key/value pairs of URL parameters. Use it to access match.params of the current <Route>.
  const { id } = useParams();

  // useEffect takes a function, that contains imperative, possibly effectful code. in below code, we are calling blogs() function from blogService.js file.
useEffect(() => {
  const fetchBlog = async () => {
    if (id) {
      const isConnected = await checkInternetConnection(); // Check internet connectivity
      setStatusColor(isConnected ? "green" : "red");
      const getBlogService = isConnected ? getBlog : offlineGetBlog;

      getBlogService(id)
        .then((response) => {
          setTitle(response.data.title);
          setContent(response.data.content);
          setAuthorId(response.data.author.id);
          setAuthorName(response.data.author.name);
          setAuthorEmail(response.data.author.email);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  fetchBlog();
}, [id]);

  console.log(id);

  function pageTitle() {
    if (id) {
      return (
        <h2 className="text-center mb-4" style={{ color: statusColor }}>
          Update Blog
        </h2>
      );
    } else {
      return (
        <h2 className="text-center mb-4" style={{ color: statusColor }}>
          Create Blog
        </h2>
      );
    }
  }

  function validate() {
    let isValid = true;

    const errorsCopy = { ...errors };
    if (!title.trim()) {
      errorsCopy.title = "Title is required";
      isValid = false;
    }
    if (!content.trim()) {
      errorsCopy.content = "Content is required";
      isValid = false;
    }
    if (!authorId) {
      errorsCopy.authorId = "Author Id is required";
      isValid = false;
    }
    if (!authorName.trim()) {
      errorsCopy.authorName = "Author Name is required";
      isValid = false;
    }
    if (!authorEmail.trim()) {
      errorsCopy.authorEmail = "Author Email is required";
      isValid = false;
    }
    setErrors(errorsCopy);
    return isValid;
  }

  return (
    <div className="container mt-5" style={{ color: statusColor }}>
      {pageTitle()}
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={saveOrUpdateBlog}>
            <div className="form-group">
              <label
                htmlFor="title"
                className="font-weight-bold mb-2 text-primary"
              >
                Title
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="content"
                className="font-weight-bold mb-2 text-success"
              >
                Content
              </label>
              <textarea
                className={`form-control ${errors.content ? "is-invalid" : ""}`}
                placeholder="Enter Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <div className="invalid-feedback">{errors.content}</div>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="authorId"
                className="font-weight-bold mb-2 text-info"
              >
                Author Id
              </label>
              <input
                type="number"
                className={`form-control ${
                  errors.authorId ? "is-invalid" : ""
                }`}
                placeholder="Enter Author Id"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              />
              {errors.authorId && (
                <div className="invalid-feedback">{errors.authorId}</div>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="authorName"
                className="font-weight-bold mb-2 text-danger"
              >
                Author Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.authorName ? "is-invalid" : ""
                }`}
                placeholder="Enter Author Name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
              {errors.authorName && (
                <div className="invalid-feedback">{errors.authorName}</div>
              )}
            </div>
            <div className="form-group">
              <label
                htmlFor="authorEmail"
                className="font-weight-bold mb-2 text-warning"
              >
                Author Email
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.authorEmail ? "is-invalid" : ""
                }`}
                placeholder="Enter Author Email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
              />
              {errors.authorEmail && (
                <div className="invalid-feedback">{errors.authorEmail}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={saveOrUpdateBlog}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogComponent;
