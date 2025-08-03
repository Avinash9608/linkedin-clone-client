import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Link,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthContext from "../context/authContext";
import LinkedInLogo from "../assets/linkedin-logo.png";

const Register = () => {
  const { register } = useContext(AuthContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      bio: Yup.string().max(500, "Must be 500 characters or less"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await register(values);
        history.push("/");
      } catch (err) {
        setErrors({ email: "Email already in use" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <GoogleOAuthProvider clientId="1234-xyz.apps.googleusercontent.com">
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
            Join LinkedIn
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  size="small"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password (6+ characters)"
                  type="password"
                  variant="outlined"
                  size="small"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="bio"
                  name="bio"
                  label="Headline (e.g. Software Developer)"
                  variant="outlined"
                  size="small"
                  multiline
                  minRows={3}
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
              </Grid>
            </Grid>

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                mb: 3,
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: "0.75rem",
              }}
            >
              By clicking Agree & Join, you agree to the LinkedIn
              <Link href="#" sx={{ ml: 0.5 }}>
                User Agreement
              </Link>
              ,
              <Link href="#" sx={{ ml: 0.5 }}>
                Privacy Policy
              </Link>
              , and
              <Link href="#" sx={{ ml: 0.5 }}>
                Cookie Policy
              </Link>
              .
            </Typography>

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
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#004182",
                },
              }}
            >
              Agree & Join
            </Button>
          </form>
        </Paper>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.9)" }}>
            Already on LinkedIn?{" "}
            <Link
              component="button"
              variant="body1"
              onClick={() => history.push("/login")}
              sx={{
                color: "#0a66c2",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Register;
