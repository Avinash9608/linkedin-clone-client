import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Typography,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  Avatar,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  Whatshot,
  PhotoCamera,
  VideoCall,
  Favorite,
  Share,
  Bookmark,
  ChatBubbleOutline,
  WorkOutline,
  School,
  Article,
  Event,
  TrendingUp,
  Lightbulb,
  Code,
  DesignServices,
  BarChart,
  Public,
  People,
} from "@mui/icons-material";
import AuthContext from "../context/authContext";
import api from "../utils/api";
import Post from "../components/Post";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/posts");
      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        message: "Failed to load posts",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/posts", { content });
      setPosts([res.data.data, ...posts]);
      setContent("");
      setAlert({
        open: true,
        message: "Post created successfully",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
      setAlert({
        open: true,
        message: "Failed to create post",
        severity: "error",
      });
    }
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

  if (isLoading) {
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
        <Box textAlign="center">
          <Box
            component="img"
            src="/linkedin-loading.gif"
            alt="Loading"
            sx={{ width: 120, mb: 2 }}
          />
          <Typography variant="h6" color="textSecondary">
            Building your professional network...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f3f6f9", minHeight: "100vh", pt: 3 }}>
      <Container maxWidth="lg" sx={{ display: "flex", gap: 3 }}>
        {/* Left Sidebar */}
        <Box sx={{ width: 240, flexShrink: 0 }}>
          <Paper
            sx={{
              borderRadius: 2,
              mb: 2,
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                p: 2,
                background: "linear-gradient(to bottom, #fff, #f9f9f9)",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                Recent
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Whatshot sx={{ color: "#915907", mr: 1 }} />
                <Typography variant="body2" fontWeight="500">
                  Trending
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <WorkOutline sx={{ color: "#004182", mr: 1 }} />
                <Typography variant="body2" fontWeight="500">
                  Jobs
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <School sx={{ color: "#915907", mr: 1 }} />
                <Typography variant="body2" fontWeight="500">
                  Learning
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                p: 2,
                background: "linear-gradient(to bottom, #fff, #f9f9f9)",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                Groups
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Discover new groups
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Create Post Card */}
          {user && (
            <Paper
              sx={{
                borderRadius: 2,
                mb: 3,
                overflow: "hidden",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar
                    src={user.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                      border: "2px solid #fff",
                      boxShadow: "0 0 0 2px #0a66c2",
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                      document.getElementById("post-input").focus()
                    }
                    sx={{
                      borderRadius: 28,
                      justifyContent: "flex-start",
                      textTransform: "none",
                      color: "rgba(0,0,0,0.6)",
                      borderColor: "rgba(0,0,0,0.15)",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.03)",
                        borderColor: "rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    Start a post
                  </Button>
                </Box>

                <form onSubmit={handleSubmit}>
                  <TextField
                    id="post-input"
                    placeholder="What do you want to talk about?"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        background: "#fff",
                        "&:hover fieldset": {
                          borderColor: "#0a66c2",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0a66c2",
                          borderWidth: 1,
                        },
                      },
                    }}
                  />

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box display="flex" gap={1}>
                      <IconButton sx={{ color: "#0a66c2" }}>
                        <PhotoCamera />
                      </IconButton>
                      <IconButton sx={{ color: "#5e9b41" }}>
                        <VideoCall />
                      </IconButton>
                      <IconButton sx={{ color: "#915907" }}>
                        <Article />
                      </IconButton>
                      <IconButton sx={{ color: "#8046b7" }}>
                        <Event />
                      </IconButton>
                    </Box>

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!content.trim()}
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: "#0a66c2",
                        color: "white",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#004182",
                        },
                        "&:disabled": {
                          backgroundColor: "rgba(0,0,0,0.08)",
                          color: "rgba(0,0,0,0.3)",
                        },
                      }}
                    >
                      Post
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Paper>
          )}

          {/* Feed Filter */}
          <Paper
            sx={{
              borderRadius: 2,
              mb: 3,
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                "& > *": {
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  py: 1.5,
                  "&:not(:last-child)": {
                    borderRight: "1px solid rgba(0,0,0,0.08)",
                  },
                },
              }}
            >
              <Box sx={{ fontWeight: "600", color: "#0a66c2" }}>
                <Typography variant="body2">All</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Recent</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Top</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Posts Feed */}
          {posts.length === 0 ? (
            <Paper
              sx={{
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
              }}
            >
              <Box sx={{ maxWidth: 400, mx: "auto" }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  No posts yet
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Be the first to share your thoughts and start the conversation
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#0a66c2",
                    "&:hover": {
                      backgroundColor: "#004182",
                    },
                  }}
                >
                  Create post
                </Button>
              </Box>
            </Paper>
          ) : (
            <Box sx={{ "& > *:not(:last-child)": { mb: 2 } }}>
              {posts.map((post) => (
                <Paper
                  key={post._id}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
                  }}
                >
                  <Post
                    post={post}
                    onPostUpdate={handlePostUpdate}
                    onPostDelete={handlePostDelete}
                  />

                  {/* Post Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      borderTop: "1px solid rgba(0,0,0,0.08)",
                      "& > *": {
                        flex: 1,
                        py: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "rgba(0,0,0,0.6)",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.03)",
                          color: "rgba(0,0,0,0.9)",
                        },
                      },
                    }}
                  >
                    <Button
                      startIcon={<Favorite />}
                      sx={{ textTransform: "none" }}
                    >
                      Like
                    </Button>
                    <Button
                      startIcon={<ChatBubbleOutline />}
                      sx={{ textTransform: "none" }}
                    >
                      Comment
                    </Button>
                    <Button
                      startIcon={<Share />}
                      sx={{ textTransform: "none" }}
                    >
                      Share
                    </Button>
                    <Button
                      startIcon={<Bookmark />}
                      sx={{ textTransform: "none" }}
                    >
                      Save
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Box>

        {/* Right Sidebar - Premium Content */}
        <Box sx={{ width: 300, flexShrink: 0 }}>
          {/* Industry Insights */}
          <Paper
            sx={{
              borderRadius: 2,
              mb: 2,
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                p: 2,
                background: "linear-gradient(to bottom, #fff, #f9f9f9)",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                Industry Pulse
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <TrendingUp sx={{ color: "#0a66c2" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="AI adoption surges 300% in Q2"
                    secondary={
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        12,345 professionals discussing
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Code sx={{ color: "#915907" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Web3 developer demand up 47%"
                    secondary={
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        Tech sector insights
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <BarChart sx={{ color: "#5e9b41" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Remote work boosts productivity metrics"
                    secondary={
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        Latest management research
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
              <Button
                variant="text"
                size="small"
                sx={{ color: "#0a66c2", mt: 1 }}
              >
                See all trends
              </Button>
            </Box>
          </Paper>

          {/* Learning Recommendations */}
          <Paper
            sx={{
              borderRadius: 2,
              mb: 2,
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                p: 2,
                background: "linear-gradient(to bottom, #fff, #f9f9f9)",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                Skill Accelerators
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Lightbulb sx={{ color: "#8046b7" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Prompt Engineering Masterclass"
                    secondary={
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        Dr. Sarah Chen - 4.9★ (2,345)
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <DesignServices sx={{ color: "#004182" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="UX for AI Products"
                    secondary={
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        Google Design Team - New!
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
              <Button
                variant="text"
                size="small"
                sx={{ color: "#0a66c2", mt: 1 }}
              >
                View all courses
              </Button>
            </Box>
          </Paper>

          {/* Networking Opportunities */}
          <Paper
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                p: 2,
                background: "linear-gradient(to bottom, #fff, #f9f9f9)",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <Typography variant="subtitle2" fontWeight="600">
                Networking Hotspots
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <People sx={{ color: "#ff6b6b" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Women in Tech Global Summit"
                    secondary={
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        5,200+ attending
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Public sx={{ color: "#4ecdc4" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Climate Tech Founders Circle"
                    secondary={
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        Virtual · Weekly
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
              <Button
                variant="text"
                size="small"
                sx={{ color: "#0a66c2", mt: 1 }}
              >
                Discover more events
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{
            borderRadius: 1,
            fontWeight: 500,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
