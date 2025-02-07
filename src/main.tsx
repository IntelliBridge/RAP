import "@trussworks/react-uswds/lib/index.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "../routes/_layout";
import Vendors from "./pages/Vendors/Vendors";
// import VendorDetail from "./pages/VendorDetail/VendorDetail"; // New component for vendor details
// import AddOperation from "./pages/Operations/AddOperation"; // New component for vendor details
// import OperationDetail from "./pages/Operations/OperationDetail"; // New component for Operation details
import RecruitDetail from "./pages/RecruitDetail/recruitDetail";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/signIn/SignIn"; // Correct import path
import ProtectedRoute from "../routes/ProtectedRoutes";
import { isLoggedIn } from "./utils/auth";
import Logout from "./pages/LogoutPage/logout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: isLoggedIn() ? <Navigate to="/dashboard" /> : <SignIn /> },
      // { path: "vendors", element: <ProtectedRoute><Vendors /></ProtectedRoute> },
      // { path: "vendors/:vendorId", element: <ProtectedRoute><VendorDetail /></ProtectedRoute> }, // Dynamic vendor path
      // { path: "operations/:operationId", element: <ProtectedRoute><OperationDetail /></ProtectedRoute> },
      // { path: "operations/add", element: <ProtectedRoute><AddOperation /></ProtectedRoute> },
      { path: "dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: "recruits/:recruitId", element: <ProtectedRoute><RecruitDetail /></ProtectedRoute> },
      { path: "logout", element: <Logout /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("rootElement is null");
}
