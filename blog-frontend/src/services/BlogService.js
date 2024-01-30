import axios from 'axios';


// online service
const baseurl = 'http://20.115.82.54:8181/api/v1/blogs';


// get all blogs. here pagination is not implemented so we are getting all blogs at once and displaying in the UI - this is not a good practice in real time scenario
export const blogs =  () => {
    console.log(axios.get(baseurl));


    return axios.get(baseurl);
    
}


// create blog - here we are passing blog object as a parameter
export const createBlog = (blog) => {
    return axios.post(baseurl, blog);
}


// get single blog - here we are passing id as a parameter to get single blog
export const getBlog = (id) => {
    return axios.get(`${baseurl}/${id}`);
}


// update blog - here we are passing id, title and content as a parameter to update blog 
export const updateBlog = (id, title,content) => {
    return axios.put(`${baseurl}/${id}?title=${title}&content=${content}`);


}


// delete blog - here we are passing id as a parameter to delete blog
export const removeBlog = (id) => {
    return axios.delete(`${baseurl}/${id}`);
}


