import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Store from "./pages/store/Store";
import Products from "./pages/product/Products";
import Cart from "./pages/cart/Cart";
import { ShoppingCartProvider } from "./context/shoppingCartContext";
import PrivateRoute from "./components/private/PrivateRoute";

function App() {
  return (
    <ShoppingCartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<Products />} />

          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Layout>
    </ShoppingCartProvider>
  );
}

export default App;
