import React from "react";
import { useRouter } from "next/router";
import { Container, Typography } from "@material-ui/core";

const marca = ({ vehicles, marca }) => {
  return (
    <Container>
      <Typography>{marca}</Typography>
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `https://apicarone.com/api/v1/vehicles/vehiclesByMake/${context.params.marca}?sort=index`
  );
  const { req, query, asPath, pathname } = context

  const vehicles = await res.json();

  return {
    props: {
      vehicles: vehicles.data,
      marca: context.params.marca,
    },
  };
};

export default marca;
