import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keepLogin } from "../redux/reducer/AuthReducer";

const UserAuth = ({ children }) => {
  const { user } = useSelector((state) => state.AuthReducer);
  console.log("keep", user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(keepLogin());
  }, [dispatch]);
  return <>{children}</>;
};

export default UserAuth;
