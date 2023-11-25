import { string } from "prop-types";

const RoomCard = ({ name, price, description, image }) => {
  return (
    <div className="shadow-lg rounded-lg grid grid-cols-2 gap-4 justify-center min-w-[350px]">
      <img
        src={image}
        className="object-cover rounded-l-lg min-h-[150px]"
        alt="Hostel Room Image"
      />
      <div className="flex flex-col justify-evenly">
        <h1 className="text-xl font-semibold">{name}</h1>
        <p>Rs. {price}/mo</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default RoomCard;

RoomCard.propTypes = {
  name: string,
  price: string,
  description: string,
  image: string,
};
