import { Route, Routes } from "react-router-dom";
import AppLayuot from "./components/AppLayuot/AppLayuot";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Store from "./pages/Store/Store";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/private-route/PrivateRout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayuot />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="store" element={<Store />} />
        <Route path="products/:id" element={<Product />} />
        <Route element={<PrivateRoute />}>
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
