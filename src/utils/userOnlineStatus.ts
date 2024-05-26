import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [isLoggedIn, setLoginStatus] = useState(false);
  useEffect(() => {
    // window.addEventListener("offline", () => {
    //   setLoginStatus(false);
    // });
    // window.addEventListener("online", () => {
    //   setLoginStatus(true);
    // });

    if (localStorage.getItem("token")) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, []);

  return isLoggedIn;
};

export default useOnlineStatus;
