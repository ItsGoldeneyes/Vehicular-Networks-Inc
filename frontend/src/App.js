import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//pages
import Home from "./components/Home/Home";
import Surveys from "./components/Surveys/Surveys";
import Polls from "./components/Polls/Polls";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

//layouts
import RootLayout from "./layouts/RootLayout"; /* - to be used for navbar*/
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useUser } from "./context/UserContext";

function App() {
  const { user } = useUser();

  return <RouterProvider router={createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="Surveys" element={<Surveys />} />
          {/* <Route path="Surveys">
              <Route path="Survey"></Route>
          </Route> */}
          <Route path="Polls" element={<Polls />}>
            {/* <Route path="Survey"></Route> */}
          </Route>
          <Route path="Feedback" element={<FeedbackForm />}>
        </Route>
          {/* <Route path=""></Route> */}
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  )} />;
}

export default App;
