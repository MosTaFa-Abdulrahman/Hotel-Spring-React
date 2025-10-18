import { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  ScrollRestoration,
} from "react-router-dom";

// Context
import { AuthContext } from "./context/AuthContext";

// Navbar & Footer
import Navbar from "./components/global/navbar/Navbar";
import Footer from "./components/global/footer/Footer";

// Pages ((User))
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import Hotels from "./pages/hotels/Hotels";
import Hotel from "./pages/hotel/Hotel";
import Apartment from "./pages/apartment/Apartment";

// Pages ((Admin && Manager))
import CreateHotel from "./pages/admin/hotel/create/CreateHotel";
import UpdateHotel from "./pages/admin/hotel/update/UpdateHotel";
import CreateApartment from "./pages/admin/apartment/create/CreateApartment";
import UpdateApartment from "./pages/admin/apartment/update/UpdateApartment";
import CreateRoom from "./pages/admin/room/create/CreateRoom";
import UpdateRoom from "./pages/admin/room/update/UpdateRoom";
import GetHotels from "./pages/admin/hotel/get/GetHotels";
import GetApartments from "./pages/admin/apartment/get/GetApartments";
import GetRooms from "./pages/admin/room/get/GetRooms";
import GetUsers from "./pages/admin/users/get/GetUsers";

// Dashboard layout
const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
};

// Simple layout for auth pages
const SimpleLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

// Protected ((ADMIN && MANAGER))
const AdminManagerRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);

  if (
    !currentUser ||
    (currentUser?.role !== "ADMIN" && currentUser?.role !== "MANAGER")
  ) {
    return <Navigate to="/" />;
  }

  return element;
};

// Protected ((USER))
const AuthenticatedRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return element;
};

function App() {
  const { currentUser } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        // Authenticated ((USER))
        {
          path: "/",
          element: <AuthenticatedRoute element={<Home />} />,
        },
        {
          path: "/users/:userId",
          element: <AuthenticatedRoute element={<User />} />,
        },
        {
          path: "/hotels",
          element: <AuthenticatedRoute element={<Hotels />} />,
        },
        {
          path: "/hotels/:hotelId",
          element: <AuthenticatedRoute element={<Hotel />} />,
        },
        {
          path: "/apartments/:apartmentId",
          element: <AuthenticatedRoute element={<Apartment />} />,
        },

        // Authenticated ((ADMIN ))
        {
          path: "/admin/create/hotel",
          element: <AdminManagerRoute element={<CreateHotel />} />,
        },
        {
          path: "/admin/udate/hotel/:hotelId",
          element: <AdminManagerRoute element={<UpdateHotel />} />,
        },
        {
          path: "/admin/create/apartment",
          element: <AdminManagerRoute element={<CreateApartment />} />,
        },
        {
          path: "/admin/udate/apartment/:apartmentId",
          element: <AdminManagerRoute element={<UpdateApartment />} />,
        },
        {
          path: "/admin/create/room",
          element: <AdminManagerRoute element={<CreateRoom />} />,
        },
        {
          path: "/admin/udate/room/:roomId",
          element: <AdminManagerRoute element={<UpdateRoom />} />,
        },
        {
          path: "/admin/hotels",
          element: <AdminManagerRoute element={<GetHotels />} />,
        },
        {
          path: "/admin/apartments",
          element: <AdminManagerRoute element={<GetApartments />} />,
        },
        {
          path: "/admin/rooms",
          element: <AdminManagerRoute element={<GetRooms />} />,
        },
        {
          path: "/admin/users",
          element: <AdminManagerRoute element={<GetUsers />} />,
        },
      ],
    },

    {
      path: "/",
      element: <SimpleLayout />,
      children: [
        {
          path: "/login",
          element: !currentUser ? <Login /> : <Navigate to="/" />,
        },
        {
          path: "/register",
          element: !currentUser ? <Register /> : <Navigate to="/" />,
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
