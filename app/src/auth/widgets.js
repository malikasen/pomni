import * as React from "react";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import styles from "./styles.module.scss";
import useAuth0 from "./useAuth0";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className={styles.authBtn} onClick={loginWithRedirect}>
      Log in
    </button>
  );
};

export const Logout = () => {
  const { logout } = useAuth0();

  return (
    <button
      className={styles.authBtn}
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log out
    </button>
  );
};

export const Protected = ({ component, ...props }) => {
  const Component = React.useMemo(
    () => withAuthenticationRequired(component),
    [component],
  );
  return <Component {...props} />;
};
