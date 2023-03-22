import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./commons/Header";
import { EmployeeForm } from "./screens/EmployeeForm";
import { EmployeeList } from "./screens/EmployeeList";
import { NotFound } from "./commons/NotFound";

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<EmployeeList />} />
      <Route path="/employee/:id_employee?" element={<EmployeeForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
