import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/home";
import UserDetailPage from "./pages/user-detail";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-detail/:email" element={<UserDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
