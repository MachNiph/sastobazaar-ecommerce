import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import Cart from "./pages/cart/Cart";
import Product from "./pages/product/Product";
import ScrollToTop from "./utils/ScrollToTop";
import CartProvider from "./context/cartContext";
import { useTheme } from "./context/ThemeContext";
import { useAuth0 } from "@auth0/auth0-react";
import Protected from "./utils/ProtectedRoute";
import Checkout from "./pages/checkout/Checkout";
import Success from "./components/checkout/Success";
import Error from "./pages/404/Error";
import Footer from "./components/Footer";
function App() {
  const [isNavbarExtended, setIsNavbarExtended] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const { isDarkTheme } = useTheme();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <div className={`${isDarkTheme ? "dark" : "light"}`}>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Navbar
            {...{
              isNavbarExtended,
              setIsNavbarExtended,
              toggleProfile,
              setToggleProfile,
            }}
          />
          <div
            onClick={() => {
              setIsNavbarExtended(false), setToggleProfile(false);
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Shop />} />
              <Route path="/product/:id" element={<Product />} />
              <Route
                path="/cart"
                element={
                  <Protected {...{ isAuthenticated, loginWithRedirect }}>
                    <Cart />
                  </Protected>
                }
              />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<Success />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>

          <Footer />
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
