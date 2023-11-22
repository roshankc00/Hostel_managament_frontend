import { string } from "prop-types";
const Search = () => {
  return (
    <div
      className={`mt-5 w-full text-black h-[3rem]  flex flex-col sm:flex-row sm:gap-0 gap-1 justify-center rounded-md`}
    >
      <input
        type="text"
        className={`px-10 sm:py-0 py-2 bg-white sm:w-[60%] w-[90%] rounded-l-md h-[3rem] border-[.1rem] border-gray-600`}
      />
      <button className="rounded-none w-[12rem] bg-[#1ab94f] text-white text-[1.4rem] h-full duration-300 hover:bg-green-700 border-[.1rem] border-gray-600">
        Search
      </button>
    </div>
  );
};

export default Search;

Search.propTypes = {
  version: string,
};
