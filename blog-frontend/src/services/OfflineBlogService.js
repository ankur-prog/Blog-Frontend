import axios from 'axios';
// offline first
const baseurl1 = 'http://127.0.0.1:8181/api/v1/blogs';

 



// get all blogs - here pagination is not implemented so we are getting all blogs at once and displaying in the UI - this is not a good practice in real time scenario
export const offlineBlogs =  () => {
    console.log(axios.get(baseurl1));


    return axios.get(baseurl1);
    
}


// create blog - here we are passing blog object as a parameter
export const offlineCreateBlog = (blog) => {
    return axios.post(baseurl1, blog);
}


// get single blog - here we are passing id as a parameter to get single blog
export const offlineGetBlog = (id) => {
    return axios.get(`${baseurl1}/${id}`);
}


// update blog - here we are passing id, title and content as a parameter to update blog
//http://localhost:9098/api/v1/blogs/17?title="Offline First Concept 1"&content="Abhishar modified this blog"
export const offlineUpdateBlog = (id, title,content) => {
    return axios.put(`${baseurl1}/${id}?title=${title}&content=${content}`);


}


// delete blog - here we are passing id as a parameter to delete blog
export const offlineRemoveBlog = (id) => {
    return axios.delete(`${baseurl1}/${id}`);
}


