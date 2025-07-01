import { Outlet } from "react-router";
import NavMenu from "./components/shared/NavMenu";

function App() {
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
}

export default App;
