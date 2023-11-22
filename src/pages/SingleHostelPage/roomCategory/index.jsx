import React from "react";

const RoomCategory = ({ name, description, price, image }) => {
  return (
    <div className="mb-2 flex justify-center p-2">
      <div className="card flex justify-center gap-4 shadow-lg  mb-20 w-[60%] flex-wrap items-center">
        <div className="content-section p-20">
          <h4 className="title font-bold text-xl mb-2">{name}</h4>
          <p className="room-size mb-2">
            {" "}
            <span className="font-bold">Room-size</span>:220sqft
          </p>
          <p className="description capitalize">{description}</p>
          <h6 className="price mt-5 font-bold text-xl text-red-800 ">
            RS {price}
            <span className="text-[16px] text-black ms-2">perMonth</span>
          </h6>
        </div>
        <div className="image-section">
          <img src={image?.url} className="w-[200px] h-[150px] mb-5" />
        </div>
      </div>
    </div>
  );
};

export default RoomCategory;
