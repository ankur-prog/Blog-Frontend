import { useState, useEffect } from "react";
import { blogs, removeBlog } from "../services/blogService";
import {
  offlineBlogs,
  offlineRemoveBlog,
} from "../services/OfflineBlogService";
import { redirect, useNavigate } from "react-router-dom";

// Path: blog-frontend/src/components/ListBlogComponent.jsx
// Compare this snippet from blog-frontend/src/components/ListBlogComponent.jsx:

const ListBlogComponent = () => {
  // useState is a hook that lets you add React state to function components.
  // useState returns a pair: the current state value and a function that lets you update it.
  // In below code, we are setting the initial state of bloglist to an empty array.
  const [bloglist, setBlogs] = useState([]);
  // this is for status color
  // useState returns a pair: the current state value and a function that lets you update it.
  // In below code, we are setting the initial state of statusColor to an empty string.
  const [statusColor, setStatusColor] = useState("");

  // useNavigate is a hook that returns a navigate function that you can call to programmatically navigate around your application.
  // In below code, we are setting the initial state of navigate to an empty array.
  const navigate = useNavigate(); //

  // useEffect is a hook that lets you perform side effects in function components.
  // useEffect runs after the render is committed to the screen.
  // useEffect takes a function, that contains imperative, possibly effectful code. in below code, we are calling blogs() function from blogService.js file.
  useEffect(() => {
    getallblogs();
  }, [statusColor]); // this is for status color

  function checkInternetConnection() {
    return fetch("https://www.google.com/", {
      // You can replace this URL with any that you know will be up
      mode: "no-cors", // 'cors' by default
      cache: "no-store", // 'default' by default
    })
      .then(() => true)
      .catch(() => false);
  }

  async function getallblogs() {
    const isConnected = await checkInternetConnection(); // Check internet connectivity
    //console.log(isConnected)
    setStatusColor(isConnected ? "green" : "red");
    //console.log(statusColor)
    const blogService = statusColor === "red" ? offlineBlogs : blogs;

    blogService()
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function addNewBlog() {
    navigate("/blogs/new");
  }

  // below function navigates to the blog with the given id.
  function updateBlog(id) {
    navigate(`/blogs/${id}`);
  }

  async function deleteBlog(id) {
    console.log(id);
    const isConnected = await checkInternetConnection();
    setStatusColor(isConnected ? "green" : "red");
    //console.log(statusColor)
    const removeBlogService =
      statusColor === "red" ? offlineRemoveBlog : removeBlog;
    removeBlogService(id).then((response) => {
      console.log(response.data);
      console.log(response.status);
      getallblogs();
      navigate("/blogs");
    });
  }

  return (
    <div className="container-fluid mt-5" style={{ color: statusColor }}>
      <h2 className="text-center">Blogs List</h2>
      <button type="button" class="btn btn-primary mb-2" onClick={addNewBlog}>
        Create Blog
      </button>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover table-striped">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col" className="text-center">
                  Id
                </th>
                <th scope="col" className="text-center">
                  Title
                </th>
                <th scope="col" className="text-center">
                  Content
                </th>
                <th scope="col" className="text-center">
                  Version
                </th>
                <th scope="col" className="text-center">
                  Author
                </th>
                <th scope="col" className="text-center">
                  CreatedAt
                </th>
                <th scope="col" className="text-center">
                  ModifiedAt
                </th>
                <th scope="col" className="text-center">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {bloglist.map((blog) => (
                <tr key={blog.id}>
                  <th scope="row" className="text-center">
                    {blog.id}
                  </th>
                  <td className="text-center">{blog.title}</td>
                  <td className="text-center">{blog.content}</td>
                  <td className="text-center">{blog.version}</td>
                  <td className="text-center">{blog.author.name}</td>
                  <td className="text-center">{blog.createdAt}</td>
                  <td className="text-center">{blog.modifiedAt}</td>
                  <td className="text-center">{blog.author.email}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => updateBlog(blog.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteBlog(blog.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBlogComponent;
