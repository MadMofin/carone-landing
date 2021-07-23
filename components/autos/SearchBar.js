import React from "react";
import { Container } from "@material-ui/core";
import SearchBarTop from "./SearchBarTop";
import SearchBarBottom from "./SearchBarBottom";

const SearchBar = ({ setQuery, query, categories, setCategory, makeId, category, disableTopBar, setPage, sort, setSort }) => {
  return (
    <Container
      maxWidth="lg"
      style={{ paddingLeft: 0, paddingRight: 0, marginBottom: 20 }}
    >
      <SearchBarTop 
        query={query} 
        setQuery={setQuery} 
        disableTopBar={disableTopBar}
        category={category}
        sort={sort}
        make={makeId}
      />
      <SearchBarBottom 
        setPage={setPage}
        query={query} 
        setQuery={setQuery} 
        categories={categories}
        setCategory={setCategory} 
        category={category}
        setSort={setSort}
        sort={sort}
        />
    </Container>
  );
};

export default SearchBar;
