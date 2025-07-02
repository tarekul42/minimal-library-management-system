import { Outlet } from "react-router";
import NavMenu from "./pages/shared/NavMenu/NavMenu";
import Footer from "./pages/shared/Footer/Footer";

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto bg-gray-900 text-gray-50  px-4 sm:px-6 lg:px-8">
        <NavMenu />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
