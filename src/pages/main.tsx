
import {
    BrowserRouter as Router,
    Route,
    Routes,
  } from "react-router-dom";
import Header from '../components/header'
import Footer from "../components/footer";
//import ProductsList from "../components/ProductList";
const MainPage = () => {
    return(
        <div>
        <Header />
        <Router>
        <Routes>
        <Route path="/" element={<div />} />
        <Route path="/signin" element={<div />} />
        <Route path="/" element={<div />} />
        <Route path="/" element={<div />} />
        
        </Routes>
        </Router>
        <p>something</p>
        <Footer/>
        </div>
    );

}

export default MainPage;