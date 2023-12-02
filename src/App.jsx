import { Route, Routes } from "react-router-dom";
import "./App.css";

import React, { lazy, Suspense, useEffect } from "react";
import Spin from "./components/Spiner";
import NotFoundPage from "./pages/NotFoundPage";
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/signup"));
const SignIn = lazy(() => import("./pages/signin"));
const Navbar = lazy(() => import("./components/Navbar"));
const Hostels = lazy(() => import("./pages/Hostels"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const SingleHostelPage = lazy(() => import("./pages/SingleHostelPage"));
const HostelLocation = lazy(() =>
  import("./pages/AdminDashboard/HostelLocation")
);
const RegisterHotel = lazy(() => import("./pages/Register"));
const SuperAdminSidebar = lazy(() => import("./components/SideBar"));
const AllUsers = lazy(() => import("./pages/AllUsers"));
const AllFaqs = lazy(() => import("./pages/AllFaq"));
const AllHostels = lazy(() => import("./pages/AllHostels"));
const AllOrders = lazy(() => import("./pages/AllOrders"));
const AllUsersResponses = lazy(() => import("./pages/UserResponses"));
const Setting = lazy(() => import("./pages/Setting"));
const UpdateFaq = lazy(() => import("./components/forms/UpdateFaqs"));
const CreateFaq = lazy(() => import("./components/forms/AddFaqs"));
const Verification = lazy(() => import("./pages/VerifyToken"));
const BookForm = lazy(() => import("./components/forms/BookForm"));
const SideBarAdmin = lazy(() => import("./pages/AdminDashboard/SideBar"));
const FoodRoutine = lazy(() => import("./pages/AdminDashboard/FoodRoutine"));
const Search = lazy(() => import("./pages/Search"));
const Rules = lazy(() => import("./pages/AdminDashboard/Rules"));
const HostelImages = lazy(() => import("./pages/AdminDashboard/HostelImages"));
const RoomCategory = lazy(() => import("./pages/AdminDashboard/RoomCategory"));
const RoomsForm = lazy(() => import("./components/forms/RoomsForm"));
const AdminOrders = lazy(() => import("./pages/AdminDashboard/orders"));
const EditRoomForm = lazy(() => import("./components/forms/EditRooms"));
const SuperAdminRoute = lazy(() => import("./secure_routes/superAdmin.route"));
const HostelOwnerRoute = lazy(() => import("./secure_routes/admin.only.route"));
const SecureRoute = lazy(() => import("./secure_routes/SecureRoute"));

function App() {
  console.log = console.warn = console.error = () => {};
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  return (
    <div className="">
      <Suspense fallback={<Spin />}>
        <Routes>
          {/* normal user route starts */}
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
          {/* normal user route ends */}

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
