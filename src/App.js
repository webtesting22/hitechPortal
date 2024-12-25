import logo from "./logo.svg";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CareerApplication from "./Components/SideBarComponents/CareerApplication/CareerApllication";
import Employee from "./Components/SideBarComponents/Employee/Employee";
import DashBoard from "./Components/SideBarComponents/DashBoard/DashBoard";
import TopBarComponent from "./Components/TopBarComponent/TopBarComponent";
import SignIn from "./Components/signIn/signIn";
import PrivateRoute from "./Components/PrivateRoute";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Evaluation from "./Components/SideBarComponents/Evaluation/Evaluation";
function App() {
  const [isSignin, setIsSignin] = useState(false); // Use array destructuring for useState
  useEffect(() => {
   
    
  }, [isSignin]);

  return (
    <BrowserRouter>
      {/* {isSignin && <Navigation />} */}
       {/* <div style={{ width: "100%" }}> */}
        {/* {isSignin && <TopBarComponent />} */} 
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<SignIn setIsSignin={setIsSignin} />} />
      
          {/* Private Routes */}
          <Route element={<PrivateRoute isAuthenticated={isSignin} />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/CareerApplication" element={<CareerApplication />} />
            <Route path="/Employee" element={<Employee />} />
            <Route path="/Evaluation" element={<Evaluation />} />

          </Route>
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
