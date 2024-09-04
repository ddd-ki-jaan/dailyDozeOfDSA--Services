import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ProblemSet from "./pages/ProblemSet/ProblemSet";
// import Dashboard from "./pages/Dashboard/Dashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProblemSetProvider from "./contexts/problemSetContext";
import UserProvider from "./contexts/userContext";
import SignIn from "./pages/SignIn/SignIn";
import problemSheets from "./constants/problemSheets.js";
import JobOpenings from "./pages/JobOpenings/JobOpenings";
import EngineeringNotes from "./pages/EngineeringNotes/EngineeringNotes.jsx";
import MySavedNotest from "./pages/MySavedNotes/MySavedNotest.jsx";
import JobOpeningsProvider from "./contexts/jobOpeningsContext.jsx";
import DashboardProvider from "./contexts/dashboardContext.jsx";
import HomeProvider from "./contexts/homeContext.jsx";
import EngineeringNotesProvider from "./contexts/engineeringNoteContext.jsx";
import PDFViewer from "./pages/PdfViewer/PdfViewer";
import Error404 from "./pages/Error404/Error404.jsx";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes.jsx";
import { Toaster } from "react-hot-toast";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./custom.css";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
        </div>
      ),
      errorElement: <Error404 />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "problemSet",
          children: [
            { index: true, element: <ProblemSet /> },
            ...problemSheets.map((item) => ({
              path: item.slug,
              element: <item.componentName sheetEnum={item.sheetEnum} />,
            })),
          ],
        },
        { path: "jobOpenings", element: <JobOpenings /> },
        { path: "engineeringNotes", element: <EngineeringNotes /> },
        {
          element: <ProtectedRoutes />,
          children: [
            { path: "Dashboard", element: <Dashboard /> },
            { path: "mySavedNotes", element: <MySavedNotest /> },
          ],
        },
        { path: "signIn", element: <SignIn /> },
      ],
    },
    { path: "pdfViewer/:id", element: <PDFViewer /> },
  ]);

  return (
    <>
      <UserProvider>
        <EngineeringNotesProvider>
          <ProblemSetProvider>
            <JobOpeningsProvider>
              <DashboardProvider>
                <HomeProvider>
                  <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
                    <RouterProvider router={browserRouter} />
                  </SkeletonTheme>
                </HomeProvider>
              </DashboardProvider>
            </JobOpeningsProvider>
          </ProblemSetProvider>
        </EngineeringNotesProvider>
      </UserProvider>
      <Toaster />
    </>
  );
}

export default App;
