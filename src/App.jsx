import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import Navbar from "./components/Navbar";
import Hostels from "./pages/Hostels";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SingleHostelPage from "./pages/SingleHostelPage";
import HostelLocation from "./pages/AdminDashboard/HostelLocation";
import RegisterHotel from "./pages/Register";
import SuperAdminSidebar from "./components/SideBar";
import AllUsers from "./pages/AllUsers";
import AllFaqs from "./pages/AllFaq";
import AllHostels from "./pages/AllHostels";
import AllOrders from "./pages/AllOrders";
import AllUsersResponses from "./pages/UserResponses";
import Setting from "./pages/Setting";
import UpdateFaq from "./components/forms/UpdateFaqs";
import CreateFaq from "./components/forms/AddFaqs";
import Verification from "./pages/VerifyToken";
import BookForm from "./components/forms/BookForm";
import SideBarAdmin from "./pages/AdminDashboard/SideBar";
import FoodRoutine from "./pages/AdminDashboard/FoodRoutine";
import Search from "./pages/Search";
import Rules from "./pages/AdminDashboard/Rules";
import HostelImages from "./pages/AdminDashboard/HostelImages";
import RoomCategory from "./pages/AdminDashboard/RoomCategory";
import RoomsForm from "./components/forms/RoomsForm";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/hostels" element={<Hostels />} />
          <Route path="/hostels/:id" element={<SingleHostelPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/location" element={<HostelLocation />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/hostel-register" element={<RegisterHotel />} />
          <Route path="/orders/:id" element={<BookForm />} />
          <Route path="/search/:keyword" element={<Search />} />
        </Route>

        {/* superadmin Route start */}
        <Route path="/" element={<SuperAdminSidebar />}>
          <Route path="/superadmin/allusers" element={<AllUsers />} />
          <Route path="/superadmin/faqs" element={<AllFaqs />} />
          <Route path="/superadmin/hostels" element={<AllHostels />} />
          <Route path="/superadmin/orders" element={<AllOrders />} />
          <Route
            path="/superadmin/all-user-responses"
            element={<AllUsersResponses />}
          />
          <Route path="/superadmin/setting" element={<Setting />} />
        </Route>
        <Route path="/superadmin/upd-faq/:id" element={<UpdateFaq />} />
        <Route path="/superadmin/createFaq" element={<CreateFaq />} />
        {/* superadmin Route ends */}

        {/* admin route starts */}
        <Route path="/" element={<SideBarAdmin />}>
          <Route path="/admin/location" element={<HostelLocation />} />
          <Route path="/admin/foods" element={<FoodRoutine />} />
          <Route path="/admin/settings" element={<Setting />} />
          <Route path="/admin/rules" element={<Rules />} />
          <Route path="/admin/images" element={<HostelImages />} />
          <Route path="/admin/room-category" element={<RoomCategory />} />
          <Route
            path="/admin/room-category-form/:hostelId"
            element={<RoomsForm />}
          />
        </Route>

        {/* admin route ends */}
      </Routes>
    </div>
  );
}

export default App;
