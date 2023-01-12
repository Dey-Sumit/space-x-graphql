import React, { ChangeEvent, useState } from "react";
import { useGetLaunchesByMissionNameQuery } from "../src/generated/graphql";
import { useDebounce } from "../src/hooks/useDebounce";
import graphqlRequestClient from "../src/lib/client/graphqlRequestClient";

const SearchComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setShowSearchBar(false);
      return;
    }
    setShowSearchBar(true);
  };
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { data: searchResults } = useGetLaunchesByMissionNameQuery(
    graphqlRequestClient,
    {
      name: debouncedSearchValue,
    },
    {
      enabled: Boolean(debouncedSearchValue),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <form
      className="max-w-[720px] mx-auto relative flex-1"
      onBlur={() => {
        setShowSearchBar(false);
      }}
      onFocus={() => {
        setShowSearchBar(true);
      }}
    >
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-white bg-gray-800 border border-gray-900 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search mission names"
          required
          onChange={handleSearch}
        />
        <button
          type="submit"
          className=" absolute right-2.5 bottom-2.5 bg-gray-200 text-gray-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
      {showSearchBar && (
        <div className="absolute left-0 right-0 p-2 bg-gray-800 rounded-md shadow-xl top-14">
          {searchResults?.launches?.length === 0 && <p className="text-gray-400">No results found</p>}
          {searchResults?.launches?.map((launch) => (
            <button
              key={launch?.id}
              className="flex flex-col justify-start w-full p-2 space-y-[2px] border-b border-gray-600  truncate "
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <CubeIcon />
                <h6>{launch?.mission_name}</h6>
              </div>
              <p className="pl-6 text-sm ">{launch?.details}</p>
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchComponent;

const SearchIcon = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5 text-gray-500 dark:text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    ></path>
  </svg>
);
const CubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
    />
  </svg>
);
