import { Outlet } from "react-router";
import NavMenu from "./pages/shared/NavMenu/NavMenu";
import Footer from "./pages/shared/Footer/Footer";

function App() {
  return (
    <>
      <div className="bg-gray-950 text-gray-50 min-h-screen flex flex-col">
        <NavMenu />
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
