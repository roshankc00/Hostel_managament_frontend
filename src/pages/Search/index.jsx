import SearchCard from "../../components/SearchCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataWithoutHeader } from "../../services/axios.service";
import SearchBar from "../../components/SearchBar";

const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [searchData, setSearchData] = useState([]);
  const hostelId = "65350ac7d1df3a00f85edea2";

  console.log(keyword);

  const getSearchData = async () => {
    const response = await getDataWithoutHeader(`search-me?keyword=${keyword}`);
    console.log(response);
    if (response.success) {
      setSearchData(response.data);
    } else {
      setSearchData([]);
    }
    console.log(searchData, "");
  };

  useEffect(() => {
    getSearchData();
  }, [keyword]);
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 -mt-8">
        <SearchBar />
        {searchData &&
          searchData.map((search) => {
            return (
              <div
                key={search._id}
                onClick={() => navigate(`/hostels/${hostelId}`)}
              >
                <SearchCard
                  name={search?.name}
                  location={search?.location?.city}
                  description={search?.description}
                />
              </div>
            );
          })}
      </div>
      <div className="not-found">
        {searchData == [] && (
          <div className="flex h-[70vh] items-center justify-center text-xl font-semibold">
            We could not find the hostel you are looking for...
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
