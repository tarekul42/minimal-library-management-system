import { Outlet } from "react-router";
import NavMenu from "./pages/shared/NavMenu/NavMenu";
import Footer from "./pages/shared/Footer/Footer";

function App() {
  return (
    <>
      <NavMenu />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
