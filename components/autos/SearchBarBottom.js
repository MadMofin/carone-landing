import React from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import { capitalCase } from "change-case";
import useCategories from '../../hooks/useCategory';
import useCategory from "../../hooks/useCategory";

const sortOptions = [
  {
    name: "Menor a $150,000",
    value: "menor150000",
  },
  {
    name: "Entre $150,000 y $250,000",
    value: "150000/250000",
  },
  {
    name: "Mayor a $250,000",
    value: "mayor250000",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: 2,
    },
  },

  selectFields: {
    color: "red",
  },

  selectOption: {
    fontSize: 30,
  },
}));

const SearchBarBottom = ({
  setCategory,
  setMake,
  category,
  setPage,
  sort,
  setSort,
}) => {
  const classes = useStyles();
  const { categories, getCategories } = useCategory();

  React.useEffect(()=>{
    getCategories();
    //eslint-disable-next-lone
  },[])
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };
  return (
    <Grid
      container
      className={classes.root}
      spacing={1}
      style={{ paddingLeft: 0, paddingRight: 0, marginBottom: 20 }}
    >
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <TextField
          style={{
            backgroundColor: "#f3f7f9",
            border: "0px solid rgb(217, 221, 233)",
            borderRadius: 10,
          }}
          className={classes.selectFields}
          select
          label="Categoría"
          placeholder="Todas"
          fullWidth
          value={category}
          onChange={handleCategory}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          <option key={0} value={"-"}>
            Todas
          </option>
          {categories && categories.map((option) => (
            <option
              key={option.name}
              value={option._id}
              className={classes.selectOption}
            >
              {capitalCase(option.name)}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <TextField
          style={{
            backgroundColor: "#f3f7f9",
            border: "0px solid rgb(217, 221, 233)",
            borderRadius: 10,
          }}
          select
          fullWidth
          label="Precio"
          value={sort}
          onChange={handleSort}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
          <option key={0} value={"-"}>
            Cualquiera
          </option>
          {sortOptions.map((option) => (
            <option
              key={option.name}
              value={option.value}
              style={{ color: "#a5a5a" }}
            >
              {option.name}
            </option>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default SearchBarBottom;
