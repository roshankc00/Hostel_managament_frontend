import Footer from "../../components/Footer";
import { getDataWithoutHeader } from "../../services/axios.service";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import "./index.css";

const Hostels = () => {
  const [hostels, sethostels] = useState([]);
  const getHostels = async () => {
    const response = await getDataWithoutHeader("hostels");
    sethostels(response.hostels);
    console.log(response);
    console.log(hostels);
  };

  useEffect(() => {
    getHostels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="hostels">
          {hostels.map((hostel) => {
            return (
              <>
                <Card
                  key={hostel._id}
                  name={hostel.name}
                  location={"wowowo"}
                  price={40000}
                  rating={hostel.averageRating}
                  noOfReviews={hostel.noOfReviews}
                  id={hostel._id}
                />
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hostels;
