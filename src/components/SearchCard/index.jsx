import { string } from "prop-types";

const SearchCard = ({ name, location, description }) => {
  return (
    <main className="card flex gap-2 sm:w-[40rem] w-[30rem] bg-white cursor-pointer shadow-lg rounded-md overflow-hidden">
      <img
        src="/hostel_image.jpeg"
        alt="Hostel"
        className="w-[50%] h-64 object-cover hostel-image transition-all ease-in-out"
      />
      <div className="px-4 flex flex-col justify-between mb-4">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 pt-2">{name}</h2>

          <p className="text-gray-600">
            <span className="mr-2">Location:</span>
            {location}
          </p>
        </div>
        <p className="text-gray-600">
          <span className="mr-2">Description:</span>
          {description}
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
