import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import Resume from "./components/views/Resume.jsx";
import ProjectDetails from "./components/views/ProjectDetails.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/resume',
        element: <Resume/>
    },
    {
        path: '/project/:project',
        element: <ProjectDetails/>
    }
]);


export default router;