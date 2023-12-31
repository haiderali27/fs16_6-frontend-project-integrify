import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
import  { useEffect } from "react";

import Header from '../components/Header'
import Footer from "../components/Footer";
import ProductsPage from "./ProductsPage";
import Product from "../components/Product";
import CartItems from "./CartPage";
import SignUp from "../components/Signup";
import SignIn from "../components/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getProducts } from "../store/products";
import { getCategories } from "../store/categories";
import UserProfile from "../components/UserProfile";
import CreateProduct from "../components/CreateProduct";
import UpdateProduct from "../components/UpdateProduct";
//import { createUser, login, logoutUser } from "../store/user";


//import ProductsList from "../components/ProductList";
const MainPage = () => {

  const dispatch: AppDispatch = useDispatch();
  const { user: {currentUser, loggedIn } } = useSelector((state: RootState) => state);

  useEffect(() => {
    //dispatch(createUser({email:"asd@integrify.com", name:"ASdd", password:"Integrify1234", avatar:"https://api.lorem.space/image/face?w=640&h=480&r=867"}));
    //dispatch(login({email: "asd@integrify.com", password:"Integrify1234"}));
    //dispatch(logoutUser())
    dispatch(getCategories());
    dispatch(getProducts(0));
  }, [dispatch]);
  
    return(
        <div>
       
        <Router>
        <Header />
        <Footer/>
        <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/" element={<ProductsPage />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/cart" element={<CartItems />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        {loggedIn && <Route path="/createProduct" element={<CreateProduct/>} />}
        {loggedIn && <Route path="/userProfile" element={<UserProfile />} />}
        {currentUser && currentUser.currentUser && currentUser.currentUser.role==='admin' && <Route path="/updateProduct/:id" element={<UpdateProduct />} />}
        </Routes>
        </Router>
      
        </div>
    );

}

export default MainPage;

