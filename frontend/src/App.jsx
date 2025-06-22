import React, { useContext } from 'react';
import Register from './Pages/Register'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import Collections from './Pages/Collections';
import Product from './Pages/Product';
import About from './Pages/About';
import Contact from './Pages/Contact';
import ProductDetail from './Pages/ProductDetail'
import Cart from './Pages/Cart';
import PlaceOrder from './Pages/PlaceOrder';
import Order from './Pages/Order';
import { ToastContainer, toast } from 'react-toastify';
import NotFound from './Pages/NotFound';
import Ai from './component/Ai';

function App() {
  let {userData} = useContext(userDataContext)
  let location = useLocation()
  return (
    <>
    <ToastContainer />
     {userData && <Nav/>}
    <Routes>
      <Route path='/login' 
        element={userData ? (<Navigate to={location.state?.from || "/"}/> ) 
        : (<Login/>)
          }/>

        <Route path='/signup' 
        element={userData ? (<Navigate to={location.state?.from || "/"}/> ) 
        : (<Register/>)}/>

        <Route path='/' 
        element={userData ? <Home/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
      
        <Route path='/about' 
        element={userData ? <About/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

        <Route path='/collection' 
        element={userData ? <Collections/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

        <Route path='/product' 
        element={userData ? <Product/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>

        <Route path='/contact' 
        element={userData ? <Contact/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
         <Route path='/productdetail/:productId' 
        element={userData ? <ProductDetail/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
       <Route path='/cart' 
        element={userData ? <Cart/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
         <Route path='/placeorder' 
        element={userData ? <PlaceOrder/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
         <Route path='/order' 
        element={userData ? <Order/> : <Navigate to="/login" state={{from: location.pathname}} /> }/>
      <Route path='*' element={<NotFound/>}/>
      
      </Routes>
      <Ai/>
    </>
  )
}

export default App