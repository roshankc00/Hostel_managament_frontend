import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCategory = ({
  name,
  description,
  price,
  image,
  totalVacentSeats,
  totalSeats,
  roomId,
}) => {
  const navigate = useNavigate();
  return (
    <div className="mb-2 flex justify-center w-full mt-5 ">
      <div className="card flex justify-between gap-4  shadow-2xl  mb-20 md:w-[60%] w-[100%] items-center p-1 ">
        <div className="content-section px-3 py-2 ">
          <h4 className="title font-bold text-xl mb-2 p-2">{name}</h4>
          <p className="room-size mb-2 p-2">
            {" "}
            <span className="font-bold">Room-size</span>:220sqft
          </p>
          <p className="description capitalize p-2">{description}</p>
          <h6 className="price mt-5 font-bold text-xl  text-red-800 ">
            RS {price}
            <span className="text-[16px] text-black ms-2 ">perMonth</span>
            <p className="text-[16px] text-black ms-2 mt-2  capitalize">
              totalSeats={totalSeats}
            </p>
            <p className="text-[16px] text-black ms-2 mt-2 capitalize">
              totalVacentSeats={totalVacentSeats}
            </p>
          </h6>
          <button
            className="w-full md:w-[300px] my-3 text-white bg-black p-2 flex justify-center rounded-md"
            onClick={() => {
              navigate(`/orders/${roomId}`);
            }}
          >
            Book Now{" "}
          </button>
        </div>
        <div className="image-section">
          <img src={image?.url} className="w-full h-full mb-5" />
        </div>
      </div>
    </div>
  );
};

export default RoomCategory;
