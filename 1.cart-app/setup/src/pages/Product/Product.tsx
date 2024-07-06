import { Button, Container, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDisptach, useAppSelector } from "../../hooks/hooks";
import {
  increase,
  decrease,
  remove,
  getAllProduts,
} from "../../features/product/productsSlice";

const Product = () => {
  const { id } = useParams();
  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(getAllProduts());
  }, []);

  const data = useAppSelector((state) =>
    state.product.products.find((item) => item.id === id)
  );

  const error = useAppSelector((state) => state.product.error);

  if (error) {
    return <pre>{error}</pre>;
  }

  const slectedItem = useAppSelector(
    (state) =>
      state.product.userCart.find(
        (item) => item.id === parseInt(id as string)
      ) || { id: id, qty: 0 }
  );

  return (
    <section className="mt-16">
      <Container>
        <div>
          <ul className="flex items-center gap-3 mb-10">
            <Link className="font-medium text-sky-700" to={"/"}>
              Home
            </Link>
            <div className="h-4 w-px bg-slate-400"></div>
            <Link className="font-medium text-sky-700" to={"/store"}>
              Store
            </Link>
          </ul>
          <div className="flex items-center justify-between">
            <div>
              <img
                className="w-[390px] h-[420px] object-contain border p-1 rounded-lg"
                src={data?.image}
                alt=""
              />
            </div>
            <div className="w-7/12 grid gap-6">
              <h4 className="text-4xl font-semibold leading-10">
                {data?.title}
              </h4>
              <span>{data?.category}</span>
              <p className="text-lg max-w-96">{data?.description}</p>

              <div>
                {slectedItem.qty === 0 ? (
                  <Button
                    onClick={() =>
                      dispatch(increase({ id: parseInt(id as string) }))
                    }
                    variant="contained">
                    Add to bag
                  </Button>
                ) : (
                  <div className="grid gap-1">
                    <div className="flex items-center gap-3">
                      <IconButton
                        onClick={() =>
                          dispatch(increase({ id: parseInt(id as string) }))
                        }
                        color="primary">
                        <AddIcon fontSize="inherit" />
                      </IconButton>
                      <Typography variant="h4">{slectedItem.qty}</Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(decrease({ id: parseInt(id as string) }))
                        }
                        color="primary">
                        <RemoveIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                    <Button
                      onClick={() =>
                        dispatch(remove({ id: parseInt(id as string) }))
                      }
                      color="error"
                      variant="contained"
                      className="px-2 w-fit">
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Product;
