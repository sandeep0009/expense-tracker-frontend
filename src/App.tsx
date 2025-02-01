
import { Routes,Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import Layout from "./layout"
import { Analytics } from "./pages/Analytics"
import { SignUp } from "./pages/Signup"
import { SignIn } from "./pages/SignIn"
import { Income } from "./pages/Income"
import { PrivateRoute } from "./components/PrivateRoute"
import { VerifyOtp } from "./pages/VerifyOtp"
import { OtpProtectedRoute } from "./lib/otpProtectedRoute"
import { HomePage } from "./pages/HomePage"

function App() {

  return (
    <>

    <Layout>

    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/verify-otp" element={<OtpProtectedRoute component={VerifyOtp} />} />      <Route path="/" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/analytics" element={<PrivateRoute component={Analytics} />} />
          <Route path="/income" element={<PrivateRoute component={Income} />} />

    </Routes>
    </Layout>

     
    </>
  )
}

export default App
