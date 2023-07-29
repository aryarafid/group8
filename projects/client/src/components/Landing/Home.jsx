import { useState } from "react";
import Login from "./Login";
import { useSelector } from "react-redux";
import DashBoardCashier from "./dashBoardCashier";

export default function Home() {
  // const [login, setLogin] = useState(true);
  const { login } = useSelector((state) => state.AuthReducer);

  const { user } = useSelector((state) => state.AuthReducer);
  console.log("penasaran ?", user.role);
  return (
    <>
      <main>
        {!login ? (
          <Login />
        ) : user.role === "Cashier" ? (
          <DashBoardCashier />
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
