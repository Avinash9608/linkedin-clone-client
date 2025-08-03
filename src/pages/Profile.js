import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  Box,
  Paper,
  Chip,
  Button,
  Tabs,
  Tab,
  Grid,
  Fade,
  Grow,
  Slide,
} from "@mui/material";
import {
  LocationOn,
  Work,
  School,
  PersonAdd,
  Chat,
  Notifications,
  Article,
  Business,
  CalendarToday,
  Email,
  LinkedIn,
  Twitter,
  GitHub,
  Phone,
} from "@mui/icons-material";
import AuthContext from "../context/authContext";
import api from "../utils/api";
import Post from "../components/Post";
import { motion } from "framer-motion";

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/users/${id}`);
      setProfile(res.data.data.user);
      setPosts(res.data.data.posts);
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        message: "Failed to load profile",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(
      posts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
    setAlert({
      open: true,
      message: "Post updated successfully",
      severity: "success",
    });
  };

  const handlePostDelete = (deletedPostId) => {
    setPosts(posts.filter((post) => post._id !== deletedPostId));
    setAlert({
      open: true,
      message: "Post deleted successfully",
      severity: "success",
    });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f3f6f9",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Box textAlign="center">
            <Box
              component="img"
              src="/linkedin-loading.gif"
              alt="Loading"
              sx={{ width: 120, mb: 2 }}
            />
            <Typography variant="h6" color="textSecondary">
              Loading professional profile...
            </Typography>
          </Box>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f3f6f9", minHeight: "100vh" }}>
      {/* Cover Photo Section */}
      <Box
        sx={{
          height: { xs: 150, md: 250 },
          backgroundColor: "#0a66c2",
          position: "relative",
          mb: { xs: 15, md: 10 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: -100, md: 10 },
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "lg",
            px: { xs: 1, md: 3 },
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Slide direction="up" in={!loading} mountOnEnter unmountOnExit>
                <Paper
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    mb: 2,
                    border: "none",
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 2, md: 3 },
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { xs: "center", md: "flex-start" },
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Avatar
                        src={profile.avatar}
                        sx={{
                          width: { xs: 120, md: 160 },
                          height: { xs: 120, md: 160 },
                          border: "4px solid white",
                          mr: { xs: 0, md: 3 },
                          mb: { xs: 2, md: 0 },
                          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        }}
                      >
                        {profile.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </motion.div>
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight="600"
                        sx={{ mb: 0.5 }}
                      >
                        {profile.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{ mb: 1 }}
                      >
                        {profile.headline || "Professional at LinkedIn Clone"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 2 }}
                      >
                        <LocationOn
                          fontSize="small"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                        {profile.location || "Global"}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          justifyContent: { xs: "center", md: "flex-start" },
                        }}
                      >
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Button
                            variant="contained"
                            startIcon={<PersonAdd />}
                            sx={{
                              backgroundColor: "#0a66c2",
                              "&:hover": { backgroundColor: "#004182" },
                            }}
                          >
                            Connect
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Button
                            variant="outlined"
                            startIcon={<Chat />}
                            sx={{
                              borderColor: "#0a66c2",
                              color: "#0a66c2",
                              "&:hover": {
                                borderColor: "#004182",
                                backgroundColor: "rgba(10, 102, 194, 0.05)",
                              },
                            }}
                          >
                            Message
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <Button
                            variant="outlined"
                            startIcon={<Notifications />}
                            sx={{
                              borderColor: "rgba(0,0,0,0.23)",
                              color: "rgba(0,0,0,0.8)",
                              "&:hover": {
                                borderColor: "rgba(0,0,0,0.5)",
                                backgroundColor: "rgba(0,0,0,0.03)",
                              },
                            }}
                          >
                            Follow
                          </Button>
                        </motion.div>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Slide>
            </Grid>
            <Grid item xs={12} md={4}>
              <Fade in={!loading} timeout={800}>
                <Paper
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    height: "100%",
                    border: "none",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="600"
                      sx={{ mb: 1 }}
                    >
                      Profile Activity
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        Posts
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        {posts.length}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        Connections
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        500+
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        Profile Views
                      </Typography>
                      <Typography variant="body2" fontWeight="500">
                        1,245
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* About Section */}
            <Grow in={!loading} timeout={1000}>
              <Paper
                sx={{
                  borderRadius: 3,
                  mb: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    background: "linear-gradient(to right, #f9f9f9, #fff)",
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    About
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  {profile.bio ? (
                    <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {profile.bio}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      No description provided
                    </Typography>
                  )}
                  <Button
                    variant="text"
                    sx={{
                      color: "#0a66c2",
                      mt: 1,
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "rgba(10, 102, 194, 0.05)",
                      },
                    }}
                  >
                    Show more
                  </Button>
                </Box>
              </Paper>
            </Grow>

            {/* Experience Section */}
            <Grow in={!loading} timeout={1200}>
              <Paper
                sx={{
                  borderRadius: 3,
                  mb: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    background: "linear-gradient(to right, #f9f9f9, #fff)",
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    Experience
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        backgroundColor: "#f3f6f9",
                        color: "#0a66c2",
                      }}
                    >
                      <Business />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="600">
                        Senior Software Engineer
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Tech Innovations Inc.
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 0.5 }}
                      >
                        <CalendarToday
                          fontSize="small"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                        Jan 2022 - Present · 1 yr 8 mos
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <LocationOn
                          fontSize="small"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                        San Francisco Bay Area
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Leading a team of 5 engineers to develop next-gen web
                        applications using React, Node.js, and AWS.
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        backgroundColor: "#f3f6f9",
                        color: "#0a66c2",
                      }}
                    >
                      <Work />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="600">
                        Software Engineer
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Digital Solutions LLC
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mb: 0.5 }}
                      >
                        <CalendarToday
                          fontSize="small"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                        Jun 2019 - Dec 2021 · 2 yrs 6 mos
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <LocationOn
                          fontSize="small"
                          sx={{ verticalAlign: "middle", mr: 0.5 }}
                        />
                        New York, NY
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="text"
                    sx={{
                      color: "#0a66c2",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "rgba(10, 102, 194, 0.05)",
                      },
                    }}
                  >
                    Show all experiences (3)
                  </Button>
                </Box>
              </Paper>
            </Grow>

            {/* Education Section */}
            <Grow in={!loading} timeout={1400}>
              <Paper
                sx={{
                  borderRadius: 3,
                  mb: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    background: "linear-gradient(to right, #f9f9f9, #fff)",
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    Education
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        backgroundColor: "#f3f6f9",
                        color: "#0a66c2",
                      }}
                    >
                      <School />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="600">
                        Stanford University
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Master of Computer Science
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        2018 - 2020
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Specialized in Artificial Intelligence and Machine
                        Learning. GPA: 3.9/4.0
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        backgroundColor: "#f3f6f9",
                        color: "#0a66c2",
                      }}
                    >
                      <School />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="600">
                        University of California
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        Bachelor of Science in Computer Engineering
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        2014 - 2018
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="text"
                    sx={{
                      color: "#0a66c2",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "rgba(10, 102, 194, 0.05)",
                      },
                    }}
                  >
                    Show all education
                  </Button>
                </Box>
              </Paper>
            </Grow>

            {/* Skills Section */}
            <Grow in={!loading} timeout={1600}>
              <Paper
                sx={{
                  borderRadius: 3,
                  mb: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    background: "linear-gradient(to right, #f9f9f9, #fff)",
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    Skills
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      sx={{ mb: 1 }}
                    >
                      Technical Skills
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {[
                        "JavaScript",
                        "React",
                        "Node.js",
                        "Python",
                        "AWS",
                        "Docker",
                        "GraphQL",
                        "TypeScript",
                      ].map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          sx={{
                            backgroundColor: "#e3f2fd",
                            color: "#0a66c2",
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      sx={{ mb: 1 }}
                    >
                      Soft Skills
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {[
                        "Leadership",
                        "Teamwork",
                        "Communication",
                        "Problem Solving",
                        "Agile Methodology",
                      ].map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          sx={{
                            backgroundColor: "#f5f5f5",
                            color: "rgba(0,0,0,0.87)",
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Button
                    variant="text"
                    sx={{
                      color: "#0a66c2",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "rgba(10, 102, 194, 0.05)",
                      },
                    }}
                  >
                    Show all skills
                  </Button>
                </Box>
              </Paper>
            </Grow>

            {/* Posts Section */}
            <Grow in={!loading} timeout={1800}>
              <Paper
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    background: "linear-gradient(to right, #f9f9f9, #fff)",
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    Activity
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#0a66c2",
                        height: 3,
                      },
                    }}
                  >
                    <Tab
                      label="Posts"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        "&.Mui-selected": {
                          color: "#0a66c2",
                        },
                      }}
                    />
                    <Tab
                      label="Comments"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        "&.Mui-selected": {
                          color: "#0a66c2",
                        },
                      }}
                    />
                    <Tab
                      label="Reactions"
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        "&.Mui-selected": {
                          color: "#0a66c2",
                        },
                      }}
                    />
                  </Tabs>

                  {posts.length === 0 ? (
                    <Box
                      sx={{
                        p: 4,
                        textAlign: "center",
                        border: "1px dashed rgba(0,0,0,0.12)",
                        borderRadius: 2,
                        mt: 2,
                      }}
                    >
                      <Article
                        sx={{
                          fontSize: 48,
                          color: "rgba(0,0,0,0.12)",
                          mb: 2,
                        }}
                      />
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        No posts yet
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {profile._id === currentUser?._id
                          ? "Share your first post to get started!"
                          : `${profile.name} hasn't posted anything yet`}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ mt: 2 }}>
                      {posts.map((post) => (
                        <motion.div
                          key={post._id}
                          whileHover={{ scale: 1.005 }}
                          style={{ marginBottom: "16px" }}
                        >
                          <Post
                            post={post}
                            onPostUpdate={handlePostUpdate}
                            onPostDelete={handlePostDelete}
                          />
                        </motion.div>
                      ))}
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grow>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            {/* People Also Viewed */}
            <Fade in={!loading} timeout={1000}>
              <Paper
                sx={{
                  borderRadius: 3,
                  mb: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    background: "linear-gradient(to right, #f9f9f9, #fff)",
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    People also viewed
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  {[
                    {
                      name: "Michael Chen",
                      role: "Senior Frontend Developer at Meta",
                      avatar: "/avatars/michael-chen.jpg",
                    },
                    {
                      name: "Sarah Johnson",
                      role: "UX Designer at Google",
                      avatar: "/avatars/sarah-johnson.jpg",
                    },
                    {
                      name: "David Kim",
                      role: "Backend Engineer at Amazon",
                      avatar: "/avatars/david-kim.jpg",
                    },
                  ].map((person, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box sx={{ display: "flex", mb: 2 }}>
                        <Avatar
                          src={person.avatar}
                          sx={{ width: 48, height: 48, mr: 1.5 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" fontWeight="600">
                            {person.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {person.role}
                          </Typography>
                          <Button
                            variant="text"
                            size="small"
                            sx={{
                              color: "#0a66c2",
                              p: 0,
                              mt: 0.5,
                              textTransform: "none",
                              fontWeight: 500,
                            }}
                          >
                            Connect
                          </Button>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Paper>
            </Fade>

            {/* Similar Profiles */}
            <Fade in={!loading} timeout={1200}>
              <Paper
                sx={{
                  borderRadius: 3,
                  mb: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    background: "linear-gradient(to right, #f9f9f9, #fff)",
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    Similar profiles
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  {[
                    {
                      name: "Emily Rodriguez",
                      role: "Product Manager at Microsoft",
                      avatar: "/avatars/emily-rodriguez.jpg",
                    },
                    {
                      name: "James Wilson",
                      role: "Tech Lead at Apple",
                      avatar: "/avatars/james-wilson.jpg",
                    },
                  ].map((person, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Box sx={{ display: "flex", mb: 2 }}>
                        <Avatar
                          src={person.avatar}
                          sx={{ width: 48, height: 48, mr: 1.5 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" fontWeight="600">
                            {person.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {person.role}
                          </Typography>
                          <Button
                            variant="text"
                            size="small"
                            sx={{
                              color: "#0a66c2",
                              p: 0,
                              mt: 0.5,
                              textTransform: "none",
                              fontWeight: 500,
                            }}
                          >
                            Connect
                          </Button>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Paper>
            </Fade>

            {/* Contact Info */}
            <Fade in={!loading} timeout={1400}>
              <Paper
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    background: "linear-gradient(to right, #f9f9f9, #fff)",
                  }}
                >
                  <Typography variant="h6" fontWeight="600">
                    Contact info
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      p: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.03)",
                      },
                    }}
                  >
                    <Email
                      sx={{
                        color: "rgba(0,0,0,0.6)",
                        mr: 1.5,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body2">{profile.email}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      p: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.03)",
                      },
                    }}
                  >
                    <Phone
                      sx={{
                        color: "rgba(0,0,0,0.6)",
                        mr: 1.5,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body2">(415) 555-0123</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      p: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.03)",
                      },
                    }}
                  >
                    <LinkedIn
                      sx={{
                        color: "rgba(0,0,0,0.6)",
                        mr: 1.5,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body2">
                      linkedin.com/in/
                      {profile.name.toLowerCase().replace(/\s/g, "")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      p: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.03)",
                      },
                    }}
                  >
                    <Twitter
                      sx={{
                        color: "rgba(0,0,0,0.6)",
                        mr: 1.5,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body2">
                      twitter.com/username
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.03)",
                      },
                    }}
                  >
                    <GitHub
                      sx={{
                        color: "rgba(0,0,0,0.6)",
                        mr: 1.5,
                        fontSize: 20,
                      }}
                    />
                    <Typography variant="body2">github.com/username</Typography>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alert.severity}
            sx={{
              borderRadius: 2,
              fontWeight: 500,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              alignItems: "center",
            }}
          >
            {alert.message}
          </Alert>
        </motion.div>
      </Snackbar>
    </Box>
  );
};

export default Profile;
