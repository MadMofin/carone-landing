import React, { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Meta from "../../components/Meta";
import SearchBar from "../../components/trabajos/SearchBar";
import Pagination from "../../components/Pagination";
import useJob from "../../hooks/useJob";
import JobList from "../../components/trabajos/JobList";

const index = ({ jobsSP, categories, storeId, total }) => {
  const { jobs, getJobs, loading, results } = useJob();

  const [disableTopBar, setDisableTopBar] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("-");
  const [sort, setSort] = useState("-");

  const changePage = (event, value) => setPage(value);

  useEffect(() => {
    getJobs(
      page,
      `${query}&store=${storeId}&category=${category}&salaries=${sort}`
    );
  }, [category, sort, page]);

  return (
    <>
      <Meta
        title="Búsqueda de trabajos Car One"
        description="Los mejores trabajos los encuentras en Car One"
      />
      <Container maxWidth="lg">
        <SearchBar
          setQuery={setQuery}
          query={query}
          store={storeId}
          categories={categories}
          setCategory={setCategory}
          category={category}
          disableTopBar={disableTopBar}
          setPage={setPage}
          sort={sort}
          setSort={setSort}
        />
        <Grid container>
          {jobs && jobs.length > 0 ? (
            <JobList jobs={jobs} loading={loading} />
          ) : (
            <JobList jobs={jobsSP} loading={loading} />
          )}
        </Grid>
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

  // const res = await fetch(`http://localhost:5000/api/v1/jobs/advancedResults?page=1&limit=12&searchText=&store=604a3d5d8b1d510015b0dacf`);
  const res = await fetch(`https://apicarone.com/api/v1/jobs/advancedResults?page=1&limit=12&searchText=&store=${storeP}`);
  const jobs = await res.json();

  const categoriesRes = await fetch(
    "https://apicarone.com/api/v1/jobCategories"
  );
  const categories = await categoriesRes.json();

  return {
    props: {
      jobsSp: jobs.data,
      categories: categories.data,  
      // storeId: "604a3d5d8b1d510015b0dacf",
      storeId: storeP,
      total: jobs.pagination.total,
    },
  };
};

export default index;
