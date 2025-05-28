'use client';

import { TextInput } from "flowbite-react";
import { useSearch } from "../Context/SearchContext";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <TextInput
      type="text"
      placeholder="Search blogs..."
      className="p-2 w-full"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
