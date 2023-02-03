import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import LogoMD from './LogoMD';
import LogoXS from './LogoXS';

const title = 'MY-APP';

export type Item = 'My Posts' | 
'SignOut' | 'SignIn' | 'About' | null;
const pages: Item[] = ['About'];

const settings: Item[] = ['My Posts', 'SignOut'];

const ResponsiveAppBar = (props: any) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (item: Item) => {
    setAnchorElNav(null);
    if (item)
      props.itemSelected(item);
  };

  const handleCloseUserMenu = (item: Item) => {
    setAnchorElUser(null);
    if (item)
      props.itemSelected(item);
  };

  const isActive = (page: Item) => page?.toLowerCase() == props.activeItemName.toLowerCase();

  return (
    <AppBar position="static" data-test='nav-bar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoMD title={title} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              onClose={() => handleCloseNavMenu(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LogoXS title={title} />
          <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                data-active={isActive(page)}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, display: 'block', color: 
                  isActive(page) ? 'orange' : 'white' }}
              >
                {page}
              </Button>
            ))}
          </Box>

        { props.user ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button
                data-test='appbar-open-settings'
                onClick={handleOpenUserMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {props.user.username}
              </Button>
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
              onClose={() => handleCloseUserMenu(null)}
            >
              {settings.map((setting) => (
                <MenuItem data-test={`${setting?.toLowerCase()}-button`} 
                  key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          : <Button data-test='navbar-signin-button' onClick={() => props.itemSelected('SignIn')} 
            sx={{ my: 2, color: isActive('SignIn') ? 'orange' : 'white', display: 'block' }}>
              Sign In</Button>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
