import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
// import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import {useLogout} from '../hooks/useLogout';
import useAuthContext from '../hooks/useAuthContext';
import CardMedia from "@mui/material/CardMedia";
import logo from "./images/logo.jpg";
import { useEffect } from 'react';

// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  let {user} = useAuthContext()
  const [userEmail, setUserEmail] = React.useState(""); 
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {logout} = useLogout();

  const handleLogout = () =>{
    logout()
  }
  
  useEffect(() => {
    if(user) {
      if(user.data){
        user = user.data;
      }
      setUserEmail(user.email)
      console.log("user", user.email)
    }
  },[user, setUserEmail])

  return (
    <AppBar position="static"  variant='elevated' sx={{backgroundColor: "#356CB1", borderRadius: "10px"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:"flex", "justify-content": "space-between"}}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
            }}
          >
            <CardMedia
              component="img"
              sx={{
              width: { xs: "150px", md: "200px" },
              }}
              src={logo}
            />
          </Typography>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box> */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO_S
          </Typography> */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box> */}

          {user && (<Box sx={{display: "flex"}}>
              <Typography sx={{mr: "10px", paddingTop: "5px", font:"bold"}}>
                {userEmail}
              </Typography>
            <Box>
              <Button onClick={handleLogout} style={{marginRight: '10px', textDecoration: 'none', color: 'white', padding: '5px', border: '1px solid', borderRadius:'7px'}}>logout</Button>
            </Box>

            {/* <Box sx={{ flexGrow: 0}}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Zeina Jawad"/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
            </Box>)}
          {!user && <Box sx={{display: "flex"}}>
                <Button><Link to = {`/`} style={{ textDecoration: 'none', color: 'white'}}>home</Link></Button>
                <Button><Link to = {`/signin`} style={{ textDecoration: 'none', color: 'white'}}>sign in</Link></Button>
                <Button><Link to = {`/signup`} style={{ textDecoration: 'none', color: 'white'}}>sign up</Link></Button>
          </Box>}

      {/* <div>{user? <div>Logged In</div> : 
      <GoogleLogin
      onSuccess={(response)=> {console.log(response)}}
      onError={()=> {console.log("Error while logging in!")}}
      />}</div>   */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
