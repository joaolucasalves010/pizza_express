import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthLayout from "./components/AuthLayout";
import AccountCreationSuccess from "./pages/AccountCreationSuccess";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import EditUser from "./pages/EditUser";
import DashboardHome from "./pages/DashboardHome";
import Products from "./pages/Products";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/" element={<AuthLayout />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route
              path="success/:username"
              element={<AccountCreationSuccess />}
            />
          </Route>

          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<DashboardHome />} index/>
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<CreateProduct />} />
          </Route>
          <Route path="/edit-user" element={<EditUser />}/>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
