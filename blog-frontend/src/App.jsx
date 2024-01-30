

import './App.css'
import ListBlogComponent from './components/ListBlogComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import BlogComponent from './components/CreateBlogComponent'
import {BrowserRouter,Route,Routes} from 'react-router-dom'



function App() {
  

  return (
    <>
 
    {/* BrowserRouter is a component that wraps all the routes in your application and  provides them with all the functionality related to routing.
    The BrowserRouter component should always be imported from the react-router-dom package.*/}
    <BrowserRouter>
    <HeaderComponent />
   {/* routes   */}
    <Routes>

      {/*http://localhost:4000/*/}
      <Route path='/' element={<ListBlogComponent />} />

     {/*http://localhost:4000/blogs*/ } 
      <Route path='/blogs' element={<ListBlogComponent />} />
      
     {/*http://localhost:4000/blogs/new*/ }
      <Route path='/blogs/new' element={<BlogComponent />} />

      {/*http://localhost:4000/blogs/:id*/ }
      <Route path='/blogs/:id' element={<BlogComponent />} />

    </Routes>
   
    </BrowserRouter>
    </>
  )
}

export default App
