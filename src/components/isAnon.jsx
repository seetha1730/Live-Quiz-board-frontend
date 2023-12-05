import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading 
  if (isLoading) return <p>Loading authentication status⏳ ...</p>;

  if (isLoggedIn) {
     
    return <Navigate to="/" />;
  } else {
   
    return children;
  }
}
IsAnon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsAnon;