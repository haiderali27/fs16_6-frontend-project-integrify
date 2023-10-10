import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
import  { useEffect } from "react";

import Header from '../components/Header'
import Footer from "../components/Footer";
import ProductsPage from "./Products";
import Product from "./Product";
import CartItems from "./CartItems";
import SignUp from "../components/Signup";
import SignIn from "../components/Login";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createUser, login, logoutUser } from "../store/user";
import { getProducts } from "../store/products";
import { getCategories } from "../store/categories";
import UserProfile from "../components/UserProfile";


//import ProductsList from "../components/ProductList";
const MainPage = () => {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    //dispatch(createUser({email:"asd@integrify.com", name:"ASdd", password:"Integrify1234", avatar:"https://api.lorem.space/image/face?w=640&h=480&r=867"}));
    //dispatch(login({email: "asd@integrify.com", password:"Integrify1234"}));
    //dispatch(logoutUser())
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);
  
    return(
        <div>
        <Header />
        <Router>
        <Routes>
        <Route path="/" element={<div />} />
        <Route path="/products/" element={<ProductsPage />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/cart" element={<CartItems />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
        </Router>
        <Footer/>
        </div>
    );

}

export default MainPage;

