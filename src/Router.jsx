import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import ProjectDetails from "./components/views/ProjectDetails.jsx";
import ResumeViewer from "./components/views/Resumeviewer.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/resume',
        element: <Resumeviewer/> 
    },
    {
        path: '/project/:project',
        element: <ProjectDetails/>
    }
]);


export default router;