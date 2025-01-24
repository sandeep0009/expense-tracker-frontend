
import { Routes,Route } from "react-router-dom"
import { Dashboard } from "./pages/Dashboard"
import { Transaction } from "./pages/Transaction"
import Layout from "./layout"
import { Analytics } from "./pages/Analytics"

function App() {

  return (
    <>
    <Layout>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/transactions" element={<Transaction/>}/>
      <Route path="/analytics" element={<Analytics/>}/>
    </Routes>
    </Layout>
     
    </>
  )
}

export default App
