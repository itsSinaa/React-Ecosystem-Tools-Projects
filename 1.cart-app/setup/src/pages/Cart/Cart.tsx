import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import CartItem from "./CartItem";
import { Button, Container } from "@mui/material";
import { UserCartType } from "../../features/product/productsSlice";
import { AuthInfo } from "../../components/private-route/PrivateRout";

const Cart = () => {
  const navigate = useNavigate();

  const isAuthenticated = JSON.parse(
    localStorage.getItem("auth") as string
  ) as AuthInfo;

  const selectedItem = useAppSelector((state) => state.product.userCart);

  const totalQty = selectedItem.reduce(
    (totalQty: number, userCart: UserCartType) => {
      return totalQty + userCart.qty;
    },
    0
  );

  const products = useAppSelector((state) => state.product.products);

  const totalPrice = selectedItem.reduce((total, cartItem) => {
    const item = products.find((item) => item.id === String(cartItem.id));

    return total + (item?.price || 0) * cartItem.qty;
  }, 0);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  if (selectedItem.length === 0) {
    return (
      <>
        <div className="mt-4 bg-slate-100 grid gap-3 p-2">
          <span>Hello : {isAuthenticated.userName}</span>
          <Button
            onClick={handleLogout}
            className="w-fit"
            variant="contained"
            color="error">
            Logout
          </Button>
        </div>

        <div className="w-full h-[50vh] flex flex-col items-center justify-center">
          <h1 className="text-4xl mb-3">Your Cart is currently empty :(</h1>
          <Link
            className="bg-[#3b82f6] p-2 rounded mt-6 block w-fit text-black font-medium px-3 hover:bg-[#306ac8]"
            to="/store">
            our Products
          </Link>
        </div>
      </>
    );
  }

  return (
    <Container className="my-5">
      <div className="mt-4 bg-slate-100 grid gap-3 p-2">
        <span>Hello : {isAuthenticated.userName}</span>
        <Button
          onClick={handleLogout}
          className="w-fit"
          variant="contained"
          color="error">
          Logout
        </Button>
      </div>

      {selectedItem.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}

      {totalQty && (
        <div className="mt-4 bg-slate-100 grid gap-3 p-2">
          <span>total Items : {totalQty}</span>
          <span>Totoal Price : ${totalPrice?.toLocaleString()}</span>

          <Button className="w-fit" variant="contained" color="success">
            Check out!
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
