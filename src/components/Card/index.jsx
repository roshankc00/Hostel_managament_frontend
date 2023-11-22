import { Button } from "@mui/material";
import { string, number } from "prop-types";
import { useNavigate } from "react-router-dom";

const Card = ({ name, location, rating = 3, noOfReviews = 0, id }) => {
  const navigate = useNavigate();

  function get_rating_color(rating) {
    if (rating >= 4) {
      return "bg-green-600";
    } else if (rating < 4 && rating >= 3) {
      return "bg-orange-300";
    } else if (rating < 3) {
      return "bg-red-500";
    }
  }

  return (
    <main className="card sm:w-[20rem] w-[17rem] bg-white cursor-pointer shadow-lg rounded-md overflow-hidden">
      <img
        src="/hostel_image.jpeg"
        alt="Hostel"
        className="w-full h-64 object-cover hostel-image transition-all ease-in-out"
      />
      <div className="px-4">
        <h2 className="text-3xl font-semibold text-gray-800 pt-2">{name}</h2>
        <p className={`text-gray-600 pt-3`}>
          <span
            className={`${get_rating_color(
              rating
            )} mr-2 p-1 rounded-md text-white`}
          >
            <span>{rating.toFixed(2)}</span>
            <span className="ml-2">&#9733;</span>
          </span>
          ({noOfReviews} reviews)
        </p>
        <p className="text-gray-600">
          <span className="mr-2">Location:</span>
          {location}
        </p>
        <div className="flex justify-between mb-5">
          <Button variant="contained" onClick={() => navigate(`/orders/${id}`)}>
            Book Now
          </Button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={() => navigate(`/hostels/${id}`)}
          >
            Details
          </button>
        </div>
      </div>
    </main>
  );
};

export default Card;

Card.propTypes = {
  name: string,
  location: string,
  id: string,
  rating: number,
  noOfReviews: number,
};
