import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { getAllProducts } from "../../api/query";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useAppDisptach, useAppSelector } from "../../hooks/hooks";
import { getAllProduts } from "../../features/product/productsSlice";

const Home = () => {
  const dispatch = useAppDisptach();

  useEffect(() => {
    dispatch(getAllProduts());
  }, []);
  const data = useAppSelector((state) => state.product.products);
  const isLoading = useAppSelector((state) => state.product.isLoading);
  const error = useAppSelector((state) => state.product.error);

  if (error) {
    return <pre>{error}</pre>;
  }

  return (
    <main className="text-zinc-800 mt-9">
      <Container>
        <section>
          <div className="flex items-center flex-row-reverse justify-between">
            <div className="w-3/12">
              <Swiper
                className="w-full"
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 1500 }}>
                <SwiperSlide className="h-full">
                  <img
                    className="object-cover h-96 rounded"
                    src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                    alt="Slide 4"
                  />
                </SwiperSlide>
                <SwiperSlide className="h-full">
                  <img
                    className="object-cover h-96 rounded"
                    src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                    alt="Slide 4"
                  />
                </SwiperSlide>
                <SwiperSlide className="h-full">
                  <img
                    className="object-cover h-96 rounded"
                    src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
                    alt="Slide 4"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="w-6/12">
              <h1 className="text-7xl font-bold mb-6">
                We are changing the way people shop
              </h1>
              <p className="leading-8 text-lg">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Blanditiis harum quibusdam deserunt quidem sint, perferendis
                velit autem fuga dolore eveniet corporis saepe quam expedita
                maiores facere tempora, modi ipsam magni.
              </p>
              <Link
                className="bg-[#3b82f6] p-2 rounded mt-6 block w-fit text-black font-medium px-3 hover:bg-[#306ac8]"
                to="/store">
                our Products
              </Link>
            </div>
          </div>
          <div className="mt-16">
            <h2 className="border-b border-b-[#e2e8f043] text-4xl pb-6">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {isLoading
              ? Array(3)
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
              : data?.slice(0, 3).map((item) => {
                  return (
                    <Link
                      to={`products/${item.id}`}
                      className="flex flex-col gap-4 p-2 border border-[#e2e8f043] rounded mb-16 bg-slate-100"
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
                })}
          </div>
        </section>
      </Container>
    </main>
  );
};

export default Home;
