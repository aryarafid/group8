import { useState } from "react";
import Login from "./Login";
import DashboardAdmin from "./dashboardAdmin";

export default function Home() {
  const [isLogin, setLogin] = useState(false);
  return (
    <>
      <main>
        {/* <Navbar /> */}
        {isLogin ? <DashboardAdmin /> : <Login />}
      </main>
    </>
  );
}
