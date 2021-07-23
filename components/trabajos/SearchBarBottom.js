import React from "react";
import { makeStyles, Grid, TextField } from "@material-ui/core";
import { capitalCase } from "change-case";


const sortOptions = [
  {
    name: "Entre $5,000 y $8,000",
    value: "5000/8000",
  },
  {
    name: "Entre $8,000 y $12,000",
    value: "8000/12000",
  },
  {
    name: "Mayor a $12,000",
    value: "mayor12000",
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
  categories,
  setCategory,
  category,
  sort,
  setSort,
}) => {
  const classes = useStyles();

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
          {categories.map((option) => (
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
          label="Salario"
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
