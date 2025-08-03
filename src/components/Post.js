import React, { useState, useContext } from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Link, 
  IconButton, 
  Menu, 
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AuthContext from "../context/authContext";
import api from "../utils/api";

const Post = ({ post, onPostUpdate, onPostDelete }) => {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  
  const isAuthor = user && post.author && user._id === post.author._id;
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleEditClick = () => {
    setEditContent(post.content);
    setEditDialogOpen(true);
    handleMenuClose();
  };
  
  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };
  
  const handleEditSubmit = async () => {
    try {
      const res = await api.put(`/posts/${post._id}`, { content: editContent });
      if (onPostUpdate) {
        onPostUpdate(res.data.data);
      }
      setEditDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleDeleteClick = async () => {
    try {
      await api.delete(`/posts/${post._id}`);
      if (onPostDelete) {
        onPostDelete(post._id);
      }
    } catch (err) {
      console.error(err);
    }
    handleMenuClose();
  };

  return (
    <Card style={{ marginBottom: "20px" }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar style={{ marginRight: "10px" }}>
              {post.author?.name?.charAt(0) || "U"}
            </Avatar>
            <div>
              <Link
                component={RouterLink}
                to={`/profile/${post.author?._id}`}
                color="inherit"
                underline="none"
              >
                <Typography variant="subtitle1">
                  {post.author?.name || "Unknown"}
                </Typography>
              </Link>
              <Typography variant="caption" color="textSecondary">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </Typography>
            </div>
          </div>
          
          {isAuthor && (
            <div>
              <IconButton 
                aria-label="more" 
                aria-controls="post-menu" 
                aria-haspopup="true"
                onClick={handleMenuOpen}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="post-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </div>
        <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
          {post.content}
        </Typography>
        
        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose} fullWidth>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Content"
              fullWidth
              multiline
              minRows={3}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={handleEditSubmit} 
              color="primary"
              disabled={!editContent.trim()}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Post;
