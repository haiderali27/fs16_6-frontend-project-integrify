
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
  import { useEffect } from "react";
  import { AppDispatch } from "../store/store";
  import { getCategories } from "../store/categories";
  import products, { getProducts } from '../store/products';
  import { useDispatch, useSelector } from "react-redux";
  import { RootState } from "../store/store";

  import { useParams } from "react-router-dom";

  import Header from '../components/header'
import Footer from "../components/footer";
import ProductsList from "../components/productList";
import ProductPage from "./Products";
import ProductsPage from "./Products";
import Product from "./Product";
import CartItems from "./CartItems";



//import ProductsList from "../components/ProductList";
const MainPage = () => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
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
        <Route path="/" element={<div />} />
        <Route path="/" element={<div />} />
        </Routes>
        </Router>
        <Footer/>
        </div>
    );

}

export default MainPage;