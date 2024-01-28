import axios from 'axios';
// offline first
//const baseurl = 'http://127.0.0.1:8181/api/v1/blogs';

// online 
const baseurl = 'http://20.115.82.54:8181/api/v1/blogs';


// get all blogs
export const blogs =  () => {
    console.log(axios.get(baseurl));


    return axios.get(baseurl);
    
}


// create blog
export const createBlog = (blog) => {
    return axios.post(baseurl, blog);
}


// get single blog
export const getBlog = (id) => {
    return axios.get(`${baseurl}/${id}`);
}


// update blog
export const updateBlog = (id, title,content) => {
    return axios.put(`${baseurl}/${id}?title=${title}&content=${content}`);


}


// delete blog
export const removeBlog = (id) => {
    return axios.delete(`${baseurl}/${id}`);
}


