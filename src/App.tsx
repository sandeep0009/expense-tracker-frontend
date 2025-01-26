
import { Routes,Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Transaction } from "./pages/Transaction"
import Layout from "./layout"
import { Analytics } from "./pages/Analytics"
import { SignUp } from "./pages/Signup"
import { SignIn } from "./pages/SignIn"
import { Income } from "./pages/Income"

function App() {

  return (
    <>
    <Layout>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/transactions" element={<Transaction/>}/>
      <Route path="/analytics" element={<Analytics/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/income" element={<Income/>}/>
    </Routes>
    </Layout>
     
    </>
  )
}

export default App
