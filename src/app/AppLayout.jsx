import Navbar from "../components/layouts/Navbar";
import Home from "../pages/public/Home";

export default function AppLayout({ children }) {

  return (

    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      {children ? children : <Home />}

    </div>

  );

}