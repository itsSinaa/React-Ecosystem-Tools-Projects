import React, { useEffect } from "react";
import { getSingleProdcut } from "../../api/query";
import { useQueries } from "react-query";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  decrease,
  getAllProduts,
  increase,
  remove,
  UserCartType,
} from "../../features/product/productsSlice";
import { useAppDisptach, useAppSelector } from "../../hooks/hooks";

const CartItem = ({ id, qty }: UserCartType) => {
  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(getAllProduts());
  }, []);

  const error = useAppSelector((state) => state.product.error);
  const slectedItem = useAppSelector((state) =>
    state.product.products.find((item) => item.id === String(id))
  );

  if (error) {
    return <pre>{error}</pre>;
  }

  return (
    <div
      key={id}
      className="p-2 border border-[#e2e8f043] rounded bg-slate-100 my-1">
      <div className="flex items-center flex-row-reverse gap-4">
        <Link to={`products/${slectedItem?.id}`}>
          <img
            className="rounded-md h-[150px] w-[120px] object-contain bg-white"
            src={slectedItem?.image}
            alt={slectedItem?.title}
          />
        </Link>

        <div>
          <h4 className="font-medium line-clamp-1">{slectedItem?.title}</h4>
          <p className="text-right font-normal text-sky-800 text-xl">
            ${slectedItem?.price}
          </p>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-3">
              <IconButton
                onClick={() => dispatch(increase({ id: id }))}
                color="primary">
                <AddIcon fontSize="inherit" />
              </IconButton>
              <Typography variant="h4">{qty}</Typography>
              <IconButton
                onClick={() => dispatch(decrease({ id: id }))}
                color="primary">
                <RemoveIcon fontSize="inherit" />
              </IconButton>
            </div>
            <Button
              onClick={() => dispatch(remove({ id: id }))}
              color="error"
              variant="contained"
              className="px-2 w-fit">
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
