import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import AuthLayout from "./components/AuthLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/" element={<AuthLayout />}>
          <Route path="signup" element={<SignUp />}/>
          <Route path="signin" element={<SignIn />}/>
        </Route>

          <Route path="*"/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
