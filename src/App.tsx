import { Outlet } from "react-router";
import NavMenu from "./pages/shared/NavMenu/NavMenu";
import Footer from "./pages/shared/Footer/Footer";

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto bg-gray-950 text-gray-50">
        <NavMenu />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
