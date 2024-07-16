import { useAuth } from "../AuthContextProvider/useAuth";
// import cssStyles from "./UserMenu.module.css";
import {
  Box,
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

// export default function UserMenu() {
//   const authCtx = useAuth();
//   const navigate = useNavigate();
//   return (
//     <div
//       className={cssStyles.userMenuContainer}
//       onClick={() => {
//         authCtx?.logout();
//         navigate("/login");
//       }}
//     >
//       <div className={cssStyles.userMenu}>
//         <img
//           src="/defaultProfileImage.webp"
//           alt="User Profile Icon"
//           className={cssStyles.profileIcon}
//         />
//         <span>{authCtx?.name}</span>
//       </div>
//     </div>
//   );
// }

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const authCtx = useAuth();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography sx={{ minWidth: 100 }}>{authCtx?.name}</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{authCtx?.name[0]}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar />
          <Link
            to="/profile"
            style={{ color: "black", textDecoration: "none" }}
          >
            Profile
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            authCtx?.logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
