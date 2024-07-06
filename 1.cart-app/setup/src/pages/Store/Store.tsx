import { Container, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllProducts } from "../../api/query";
import { Link } from "react-router-dom";
import GridOnIcon from "@mui/icons-material/GridOn";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { useAppDisptach, useAppSelector } from "../../hooks/hooks";
import { getAllProduts } from "../../features/product/productsSlice";

const Cart = () => {
  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(getAllProduts());
  }, []);

  const [isGrid, setIsGrid] = useState(
    JSON.parse(localStorage.getItem("isGrid") as string) ?? true
  );

  useEffect(() => {
    localStorage.setItem("isGrid", JSON.stringify(isGrid));
  }, [isGrid]);

  const data = useAppSelector((state) => state.product.products);
  const isLoading = useAppSelector((state) => state.product.isLoading);
  const error = useAppSelector((state) => state.product.error);

  if (error) {
    return <pre>{error}</pre>;
  }

  return (
    <section>
      <Container>
        <div className="flex items-center justify-between my-10 border-b border-b-[#e2e8f0a7] pb-6">
          <p className="text-3xl text-zinc-900">{data?.length} products</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsGrid(!isGrid)}
              className={`${isGrid || "bg-sky-600 text-white"} p-2 `}>
              <TableRowsIcon />
            </button>
            <button
              onClick={() => setIsGrid(!isGrid)}
              className={`${isGrid && "bg-sky-600 text-white"} p-2 `}>
              <GridOnIcon />
            </button>
          </div>
        </div>
        <div className={`grid ${isGrid && "grid-cols-3"} gap-6 mb-16`}>
          {isLoading
            ? isGrid
              ? Array(8)
                  .fill("skeleton")
                  .map((item, index) => {
                    return (
                      <Stack
                        key={index}
                        spacing={1}
                        className="p-2 border border-[#e2e8f043] rounded mb-16">
                        <Skeleton
                          className="rounded-md"
                          variant="rectangular"
                          height={390}
                          sx={{ width: "100%" }}
                        />
                        <Skeleton variant="text" className="w-full" />

                        <div className="w-full flex items-center justify-center">
                          <Skeleton variant="text" className="w-12" />
                        </div>
                      </Stack>
                    );
                  })
              : Array(8)
                  .fill("skeleton")
                  .map((item, index) => {
                    return (
                      <div
                        className="flex w-full items-center gap-12 p-2 border border-[#e2e8f043] rounded bg-slate-100"
                        key={index}>
                        <Skeleton
                          variant="rectangular"
                          className="rounded-md h-[390px] w-[350px] object-contain bg-white shrink-0"
                          width={350}
                          height={390}
                        />
                        <div className="grid w-full gap-5">
                          <Skeleton
                            variant="text"
                            width={65}
                            className="font-medium line-clamp-1"
                          />
                          <Skeleton
                            variant="text"
                            width={25}
                            className="font-medium line-clamp-1"
                          />

                          <Stack className="w-full" spacing={1}>
                            <Skeleton
                              sx={{ width: "100%" }}
                              variant="rectangular"
                              className="rounded-md h-[300px] w-full object-contain bg-white shrink-0"
                            />
                            <Skeleton
                              sx={{ width: "100%" }}
                              variant="rectangular"
                              className="rounded-md h-[300px] w-full object-contain bg-white shrink-0"
                            />
                            <Skeleton
                              sx={{ width: "100%" }}
                              variant="rectangular"
                              className="rounded-md h-[300px] w-full object-contain bg-white shrink-0"
                            />
                          </Stack>
                        </div>
                      </div>
                    );
                  })
            : isGrid
            ? data?.map((item) => {
                return (
                  <Link
                    to={`/products/${item.id}`}
                    className="flex flex-col gap-4 p-2 border border-[#e2e8f043] rounded bg-slate-100"
                    key={item.id}>
                    <img
                      className="rounded-md h-[390px] object-contain bg-white"
                      src={item.image}
                      alt={item.title}
                    />
                    <h4 className="font-medium line-clamp-1">{item.title}</h4>
                    <p className="text-center font-normal text-sky-800 text-xl">
                      ${item.price}
                    </p>
                  </Link>
                );
              })
            : data?.map((item) => {
                return (
                  <Link
                    to={`/products/${item.id}`}
                    className="flex items-center gap-12 p-2 border border-[#e2e8f043] rounded bg-slate-100"
                    key={item.id}>
                    <img
                      className="rounded-md h-[390px] w-[350px] object-contain bg-white shrink-0"
                      src={item.image}
                      alt={item.title}
                    />
                    <div className="grid gap-5">
                      <h4 className="font-medium line-clamp-1">{item.title}</h4>
                      <p className="text-left font-normal text-sky-800 text-xl">
                        ${item.price}
                      </p>
                      <p>{item.description}</p>
                    </div>
                  </Link>
                );
              })}
        </div>
      </Container>
    </section>
  );
};

export default Cart;

{
}
