
import { Routes,Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Transaction } from "./pages/Transaction"
import Layout from "./layout"

function App() {

  return (
    <>
    <Layout>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/transactions" element={<Transaction/>}/>
    </Routes>
    </Layout>
     
    </>
  )
}

export default App
