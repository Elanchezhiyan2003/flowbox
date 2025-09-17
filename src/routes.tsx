import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/index";
import Dashboard from "./pages/Dashboard";
import SoloCreator from "./pages/SoloCreator";
import Student from "./pages/Student";
import TeamSetup from "./pages/TeamSetup";
import Team from "./pages/Team";
import PodEntry from "./pages/PodEntry";
import PodSetup from "./pages/PodSetup";
import Pod from "./pages/Pod";
import NotFound from "./pages/NotFound";

const routes = [
  {
    path: "/",
    children: [
      { index: true, element: <Index /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "solo-creator", element: <SoloCreator /> },
      { path: "student", element: <Student /> },
      { path: "team-setup", element: <TeamSetup /> },
      { path: "team", element: <Team /> },
      { path: "pod-entry", element: <PodEntry /> },
      { path: "pod-setup", element: <PodSetup /> },
      { path: "pod", element: <Pod /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

export const router = createBrowserRouter(routes);