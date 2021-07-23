import React, { useState } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Container, Divider, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import CarList from "../components/autos/CarList";
import SearchBar from "../components/autos/SearchBar";
import Pagination from "../components/Pagination";
import useVehicle from "../hooks/useVehicle";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
      marginBottom: 50,
    },
  },
}));

const Marca = ({ vehiclesProps, make, makeId, store, categories, total }) => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("-");
  const [sort, setSort] = useState("-");
  const [page, setPage] = useState(1);
  const [disableTopBar, setDisableTopBar] = useState(false);
  const { vehicles, results, getVehicles } = useVehicle();

  React.useEffect(() => {
    getVehicles(
      page,
      `${query}&make=${makeId}&category=${category}&prices=${sort}`
    );
  }, [page, category, sort]);

  const changePage = (event, value) => setPage(value);

  return (
    <>
      {/* <Meta
        title={`Autos tipo ${marca.toUpperCase()}`}
        description={`Busca tu auto por marca ${marca}`}
      /> */}

      <Container maxWidth="lg">
        <Divider style={{ marginBottom: "50px" }} />
        <div className={classes.root} style={{ marginBottom: 10 }}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/" passHref={true}>
              <Button>CARONE </Button>
            </Link>
            <Link color="inherit" href="/autos" passHref={true}>
              <Button>Autos</Button>
            </Link>
            <Typography
              color="textPrimary"
              style={{ textTransform: "capitalize" }}
            >
              <Button disabled>
                {make} {store}
              </Button>
            </Typography>
          </Breadcrumbs>
        </div>
        <SearchBar
          setQuery={setQuery}
          query={query}
          categories={categories}
          setCategory={setCategory}
          category={category}
          disableTopBar={disableTopBar}
          setPage={setPage}
          sort={sort}
          setSort={setSort}
          makeId={makeId}
        />
        <Divider style={{ marginBottom: "50px" }} />

        {
          vehicles ? 
          <CarList vehicles={vehicles} /> :
          <CarList vehicles={vehiclesProps} />
        }
        {
          results === 0 ? 
          <center>
            <Typography variant='h4' color='textPrimary' style={{marginTop: '2em', marginBottom: '2em'}}>
              No se encontraron resultados
            </Typography>
          </center>
          :
          <center>
          <Pagination
            total={results !== null ? results : total}
            page={page}
            limit={12}
            changePage={changePage}
            style={{marginTop: '2em'}}
          />
          </center>
        }
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { req } = context;

  const url = req.headers.host;

  const storeP = url.split(".")[0];

  const resStore = await fetch(`https://apicaroneapicarone.com/api/v1/stores/${storeP}`);
  // const resStore = await fetch(`http://localhost:5000/api/v1/stores/604cfb34ed918800155be3a2`);

  const store = await resStore.json();

  const { data } = store;

  const res = await fetch(
    // `http://localhost:5000/api/v1/vehicles/advancedResults?page=1&limit=12&searchText=&make=${data.make._id}`
    `http://apicaroneapicarone.com/api/v1/vehicles/advancedResults?page=1&limit=12&searchText=&make=${data.make._id}`
  );

  const vehicles = await res.json()

  return {
    props: {
      vehiclesProps: vehicles.data,
      make: data.make.name,
      makeId: data.make._id,
      store: data.name,
      total: vehicles.pagination.total

    },
  };
};

export default Marca;
