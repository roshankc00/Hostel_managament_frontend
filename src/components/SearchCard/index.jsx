import { string } from "prop-types";

const SearchCard = ({ name, location, description }) => {
  return (
    <main className="card flex gap-2 max-w-[1200px] w-[80vw] bg-white cursor-pointer shadow-lg rounded-md overflow-hidden mt-4 h-[130px] sm:h-[150px] md:h-[220px] lg:h-[300px]">
      <img
        src="/hostel_image.jpeg"
        alt="Hostel"
        className="h-full hostel-image transition-all ease-in-out"
      />
      <div className="px-4 flex flex-col justify-start gap-1 sm:gap-4 mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 pt-2 mb-1 sm:mb-4">
            {name}
          </h2>

          <p className="text-gray-600">
            <span className="mr-2 font-semibold">Location:</span>
            {location}
          </p>
        </div>
        <p className="text-gray-600">
          <span className="mr-2 font-semibold">Description:</span>
          {description}...
        </p>
      </div>
    </main>
  );
};

export default SearchCard;

SearchCard.propTypes = {
  name: string,
  location: string,
  id: string,
  description: string,
};
