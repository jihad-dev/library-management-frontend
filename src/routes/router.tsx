import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts & Static Page Imports
import MainLayout from "../components/layout/Mainlayout";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "../utils/PrivateRoute";
import Profile from "../Pages/Profile/Profile";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Preloader from "../utils/Preloader";

import Unauthorized from "../utils/Unauthorized";
import AllBooks from "../Pages/All_Books/AllBooks";
import MyReservations from "../Pages/My-Reservations/My-reservations";
import AddBook from "../Pages/AdminPage/AddBook";

// Lazy Loaded Dashboard Components
const Dashboard = lazy(() => import("../components/layout/Dashboard"));
const AdminHome = lazy(() => import("../Pages/AdminPage/AdminHome"));
const ViewAllOrders = lazy(() => import("../Pages/AdminPage/ViewAllOrders"));
const ViewProductFullDetails = lazy(
  () => import("../Pages/AdminPage/ViewProductFullDetails"),
);
const AddItemsForm = lazy(() => import("../Pages/AdminPage/AddProduct"));

const SalesAnalytics = lazy(() => import("../Pages/AdminPage/SalesAnalytics"));
const Customers = lazy(() => import("../Pages/AdminPage/Customers"));
const CreateAdmin = lazy(() => import("../Pages/AdminPage/CreateAdmin"));
const AllAdmin = lazy(() => import("./../Pages/AdminPage/AllAdmin"));
const ViewUserInfo = lazy(() => import("../Pages/AdminPage/ViewUserInfo"));
const CreateIssue = lazy(() => import("../Pages/AdminPage/CreateIssue"));

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin", "member"]}>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-reservations",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin", "member"]}>
            <MyReservations />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
        <Suspense fallback={<Preloader />}>
          <Dashboard />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/admin-home",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <AdminHome />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/create-issue",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <CreateIssue />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/customers",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <Customers />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/customers/:id",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <ViewUserInfo />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-admin",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <AllAdmin />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/create-admin",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <CreateAdmin />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/items/add-item",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <AddItemsForm />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/items/view-item/:id",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <ViewProductFullDetails />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-books",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              < AllBooks/>
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/books/add-book",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              < AddBook/>
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/orders",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <ViewAllOrders />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/sales-analytics",
        element: (
          <PrivateRoute allowedRoles={["librarian", "superAdmin"]}>
            <Suspense fallback={<Preloader />}>
              <SalesAnalytics />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
