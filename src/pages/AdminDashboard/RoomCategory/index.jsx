import { Button } from "@mui/material";
import { postDataWithHeader } from "../../../services/axios.service";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../../../components/RoomCard";

const RoomCategory = () => {
  const { token } = useSelector((state) => state.auth);
  const [allRooms, setallRooms] = useState([]);
  const navigate = useNavigate();

  const hostelId = "65350ac7d1df3a00f85edea2";
  const getRooms = async () => {
    const response = await postDataWithHeader(
      "get-room-hostel",
      { hostelId },
      token
    );
    console.log(response);
    if (response.success) {
      setallRooms(response.rooms);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <main className="mt-4 mb-[10rem] flex items-right justify-center sm:justify-end">
      <div className="max-w-[1080px] min-w-[350px] w-[50vw] relative sm:mr-[10vw] mr-0 flex flex-col gap-4 items-start">
        <Button
          variant="contained"
          onClick={() => navigate(`/admin/room-category-form/${hostelId}`)}
        >
          Add New
        </Button>
        <section className="flex flex-col gap-10">
          {allRooms &&
            allRooms.map((rooms) => {
              return (
                <div
                  key={rooms._id}
                  className="flex flex-col lg:flex-row gap-4"
                >
                  <RoomCard
                    name={rooms.name}
                    price={rooms.price}
                    description={rooms.description}
                    image={rooms.image.url}
                  />
                  <div className="flex gap-2 items-center justify-center">
                    <Button variant="contained">Edit</Button>
                    <Button variant="contained">Delete</Button>
                  </div>
                </div>
              );
            })}
        </section>
      </div>
    </main>
  );
};

export default RoomCategory;
