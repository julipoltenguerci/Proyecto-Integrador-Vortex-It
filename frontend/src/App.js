import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./commons/Header";
import { EmployeeForm } from "./screens/EmployeeForm";
import { AssetForm } from "./screens/AssetForm";
import { EmployeeList } from "./screens/EmployeeList";
import { NotFound } from "./commons/NotFound";
import { AssetList } from "./screens/AssetList";

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/employee/:id_employee?" element={<EmployeeForm />} />
      <Route path="/asset/:id_asset?" element={<AssetForm />} />
      <Route path="/assets" element={<AssetList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
