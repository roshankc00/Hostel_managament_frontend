import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./search.module.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  // handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchValue}`);
    console.log(searchValue);
  };
  return (
    <main className={`${styles.search}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.search_bar}`}
          placeholder="Search Hostels..."
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
      </form>
    </main>
  );
};

export default SearchBar;
