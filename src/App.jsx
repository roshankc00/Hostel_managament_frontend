import { Route, Routes } from "react-router-dom";
import "./App.css";

import React, { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
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
import AdminOrders from "./pages/AdminDashboard/orders";
import EditRoomForm from "./components/forms/EditRooms";
import SuperAdminRoute from "./secure_routes/superAdmin.route";
import HostelOwnerRoute from "./secure_routes/admin.only.route";
import SecureRoute from "./secure_routes/SecureRoute";

function App() {
  return (
    <div className="">
      <Suspense fallback={<h1> Loading</h1>}>
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

            <Route path="/" element={<SecureRoute />}>
              <Route path="/orders/:id" element={<BookForm />} />
            </Route>
            <Route path="/search/:keyword" element={<Search />} />
          </Route>

          {/* superadmin Route start */}
          <Route path="/" element={<SuperAdminSidebar />}>
            <Route path="/" element={<SuperAdminRoute />}>
              <Route path="/superadmin/allusers" element={<AllUsers />} />
              <Route path="/superadmin/faqs" element={<AllFaqs />} />
              <Route path="/superadmin/hostels" element={<AllHostels />} />
              <Route path="/superadmin/orders" element={<AllOrders />} />
              <Route
                path="/superadmin/all-user-responses"
                element={<AllUsersResponses />}
              />
              <Route path="/superadmin/setting" element={<Setting />} />
              <Route path="/superadmin/upd-faq/:id" element={<UpdateFaq />} />
              <Route path="/superadmin/createFaq" element={<CreateFaq />} />
            </Route>
          </Route>

          {/* superadmin Route ends */}

          {/* admin route starts */}
          <Route path="/" element={<HostelOwnerRoute />}>
            <Route path="/" element={<SideBarAdmin />}>
              <Route path="/admin/location" element={<HostelLocation />} />
              <Route path="/admin/foods" element={<FoodRoutine />} />
              <Route path="/admin/settings" element={<Setting />} />
              <Route path="/admin/rules" element={<Rules />} />
              <Route path="/admin/images" element={<HostelImages />} />
              <Route path="/admin/room-category" element={<RoomCategory />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/edit-room/:id" element={<EditRoomForm />} />
              <Route
                path="/admin/room-category-form/:hostelId"
                element={<RoomsForm />}
              />
            </Route>
          </Route>

          {/* admin route ends */}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
