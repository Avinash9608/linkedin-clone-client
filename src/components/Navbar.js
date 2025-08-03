import React, { useContext } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button, Avatar } from "@mui/material";
import AuthContext from "../context/authContext";
import logo from "../assets/linkdin-navbar.png"; // import your logo

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();

  return (
    <AppBar position="static">
      <Toolbar>
        <RouterLink to="/" style={{ flexGrow: 1, textDecoration: "none" }}>
          <img
            src={logo}
            alt="LinkedIn Clone"
            style={{ height: "40px", objectFit: "contain" }}
          />
        </RouterLink>
        {user ? (
          <>
            <Button
              color="inherit"
              onClick={() => history.push(`/profile/${user._id}`)}
            >
              <Avatar
                style={{ width: "24px", height: "24px", marginRight: "8px" }}
              >
                {user.name.charAt(0)}
              </Avatar>
              {user.name}
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
