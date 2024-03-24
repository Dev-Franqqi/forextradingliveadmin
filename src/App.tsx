import { BrowserRouter, Routes, Route} from "react-router-dom";
import UsersPage from "./routes/Userspage";
import LoginPage from "./routes/LoginPage";
import Userdetails from "./routes/Userdetails";
import License from "./routes/License";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<UsersPage />} />
          <Route path="/dashboard/:userId" element={<Userdetails />} />
          <Route path="/license" element={<License />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
