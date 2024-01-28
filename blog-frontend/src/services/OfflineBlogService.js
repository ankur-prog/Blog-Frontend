import axios from 'axios';
// offline first
const baseurl1 = 'http://127.0.0.1:8181/api/v1/blogs';

 



// get all blogs
export const offlineBlogs =  () => {
    console.log(axios.get(baseurl1));


    return axios.get(baseurl1);
    
}


// create blog
export const offlineCreateBlog = (blog) => {
    return axios.post(baseurl1, blog);
}


// get single blog
export const offlineGetBlog = (id) => {
    return axios.get(`${baseurl1}/${id}`);
}


// update blog
//http://localhost:9098/api/v1/blogs/17?title="Offline First Concept 1"&content="Abhishar modified this blog"
// how to pass title and content in url as query param
export const offlineUpdateBlog = (id, title,content) => {
    return axios.put(`${baseurl1}/${id}?title=${title}&content=${content}`);


}


// delete blog
export const offlineRemoveBlog = (id) => {
    return axios.delete(`${baseurl1}/${id}`);
}


