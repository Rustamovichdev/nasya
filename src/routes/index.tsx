import { Navigate } from "react-router-dom";
import { Dashboard, DebtAndCustomer, InputAndOutput, Message, Settings, VoiseCall } from "../pages";
import LoginPage from "../pages/login";
import ErrorPage from "../pages/errorpage";
import { lazy } from "react";


const MainLayout = lazy(
  () => import("../components/layout/mainLayout")
);


const menuRoutes = [
  {
    path: "dashboard",
    element: <Dashboard/>,
    title: "Dashboard",
    roles: ["admin", "manager", "cashier"],
  },
  {
    path: "debts-customers",
    element: <DebtAndCustomer/>,
    title: "Qarz va mijozlar",
    roles: ["admin", "manager"],
  },
  {
    path: "cashflow",
    element: <InputAndOutput/>,
    title: "Kirim va chiqim",
    roles: ["admin", "cashier"],
  },
  {
    path: "messages",
    element: <Message/>,
    title: "Xabarlar",
    roles: ["admin", "manager", "cashier"],
  },
  {
    path: "voice-calls",
    element: <VoiseCall/>,
    title: "Ovozli qo'ng'iroqlar",
    roles: ["admin", "manager"],
  },
  {
    path: "settings",
    element: <Settings/>,
    title: "Sozlamalar",
    roles: ["admin"],
  },
];

const routes = [
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: (
    //   <ProtectedRoute>
        <MainLayout />
    //   </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      ...menuRoutes.map(({ path, element: Page, roles }) => ({
        path,
        element: (
           Page
        ),
      })),
    ],
  },
  {
    path: "*",
    element: "Not FoundPage",
  },
];

export { menuRoutes,routes };

