import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//pages
import Home from "./components/Home";
import Surveys from "./components/Surveys";
import Polls from "./components/Polls";
import FeedbackForm from "./components/FeedbackForm";

//layouts
import RootLayout from "./layouts/RootLayout"; /* - to be used for navbar*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="Surveys" element={<Surveys />} />
      {/* <Route path="Surveys">
          <Route path="Survey"></Route>
      </Route> */}
      <Route path="Polls" element={<Polls />}>
        {/* <Route path="Survey"></Route> */}
      </Route>
      <Route path="Feedback" element={<FeedbackForm />}>
        {/* <Route path=""></Route> */}
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
