import './App.css'
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <AppRoutes />
      </div>
    </>
  )
}

export default App
