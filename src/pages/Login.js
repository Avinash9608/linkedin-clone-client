import React, { useContext } from "react";
import { useHistory } from "react-router-dom"; // Changed from useNavigate
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Link,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../context/authContext";
import LinkedInLogo from "../assets/linkedin-logo.png"; // Add your logo

const Login = () => {
  const { login } = useContext(AuthContext);
  const history = useHistory(); // Changed from useNavigate

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values);
        history.push("/"); // Changed from navigate("/")
      } catch (err) {
        setErrors({ email: " ", password: "Invalid credentials" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <img src={LinkedInLogo} alt="LinkedIn" style={{ height: 40 }} />
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 400,
            color: "rgba(0, 0, 0, 0.9)",
          }}
        >
          Welcome back
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 3, color: "rgba(0, 0, 0, 0.6)" }}
        >
          Don't miss your next opportunity. Sign in to stay updated.
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            size="small"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 1 }}
          />

          <Link
            href="#"
            variant="body2"
            sx={{
              display: "block",
              textAlign: "right",
              mb: 2,
              color: "#0a66c2",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Forgot password?
          </Link>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={formik.isSubmitting}
            sx={{
              py: 1.5,
              mb: 2,
              borderRadius: 28,
              backgroundColor: "#0a66c2",
              "&:hover": {
                backgroundColor: "#004182",
              },
            }}
          >
            Sign in
          </Button>
        </form>
      </Paper>

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.9)" }}>
          New to LinkedIn?{" "}
          <Link
            component="button"
            variant="body1"
            onClick={() => history.push("/register")} // Changed from navigate
            sx={{
              color: "#0a66c2",
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Join now
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
