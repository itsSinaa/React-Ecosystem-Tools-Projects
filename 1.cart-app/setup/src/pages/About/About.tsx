import { Container } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <section className="mt-16 flex items-center justify-center">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-7xl font-bold text-center mb-3">
            We love
            <span className="inline-block p-1 text-white bg-sky-600 rounded mx-1">
              Shopping
            </span>
          </h1>
          <p className="text-center text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero hic
            distinctio ducimus temporibus nobis autem laboriosam repellat, magni
            fugiat minima excepturi neque, tenetur possimus nihil atque! Culpa
            nulla labore nam?
          </p>
        </div>
      </Container>
    </section>
  );
};

export default About;
