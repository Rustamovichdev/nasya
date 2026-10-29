import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/index"));
const DebtAndCustomer = lazy(() => import("./debtAndCustomer/index"));
const InputAndOutput = lazy(() => import("./inputAndOutput/index"));
const Message = lazy(() => import("./messages/index"));
const VoiseCall = lazy(() => import("./voiseCall/index"));
const Settings = lazy(() => import("./settings/index"));




export {Dashboard,DebtAndCustomer,InputAndOutput,Message,VoiseCall,Settings};