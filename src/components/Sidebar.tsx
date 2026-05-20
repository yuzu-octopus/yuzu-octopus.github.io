import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Avatar,
  Typography,
  Link,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import GitHubIcon from '@mui/icons-material/GitHub';
import { draculaColors } from '../theme/dracula';
import { SITE } from '../data/site';

const navItems = [
  { text: 'Home', icon: <HomeIcon />, href: '#hero' },
  { text: 'About', icon: <PersonIcon />, href: '#about' },
  { text: 'Configs', icon: <CodeIcon />, href: '#configs' },
  { text: 'Workspace', icon: <DesktopMacIcon />, href: '#workspace' },
];

export const drawerWidth = 240;

function DrawerContent({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar
          src={SITE.avatarUrl}
          sx={{ width: 80, height: 80, margin: '0 auto', mb: 1 }}
        />
        <Typography variant="h6" sx={{ color: draculaColors.purple, fontWeight: 700 }}>
          yuzu
        </Typography>
        <Typography variant="caption" sx={{ color: draculaColors.comment }}>
          solo dev · ctf · configs
        </Typography>
      </Box>
      <Divider sx={{ borderColor: draculaColors.comment }} />
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component="a"
              href={item.href}
              onClick={onNavClick}
            >
              <ListItemIcon sx={{ color: draculaColors.foreground }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: draculaColors.comment }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon sx={{ color: draculaColors.foreground }}>
              <GitHubIcon />
            </ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: draculaColors.comment, display: 'block' }}>
          © 2026 {SITE.githubUsername}
        </Typography>
        <Typography variant="caption" sx={{ color: draculaColors.comment, display: 'block' }}>
          Powered by{' '}
          <Link href="https://pages.github.com" target="_blank" rel="noopener" sx={{ color: draculaColors.purple }}>
            GitHub Pages
          </Link>
        </Typography>
        <Typography variant="caption" sx={{ color: draculaColors.comment, display: 'block' }}>
          Made with{' '}
          <Link href="https://vite.dev" target="_blank" rel="noopener" sx={{ color: draculaColors.purple }}>
            Vite
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export function Sidebar() {
  const isDesktop = useMediaQuery('(min-width:900px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isDesktop) {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: draculaColors.currentLine,
            borderRight: `1px solid ${draculaColors.comment}`,
          },
        }}
      >
        <DrawerContent />
      </Drawer>
    );
  }

  return (
    <>
      <IconButton
        aria-label="open navigation menu"
        onClick={() => setMobileOpen(true)}
        sx={{
          position: 'fixed',
          top: 12,
          left: 12,
          zIndex: 1200,
          color: draculaColors.foreground,
          backgroundColor: draculaColors.currentLine,
          border: `1px solid ${draculaColors.comment}`,
          '&:hover': {
            backgroundColor: draculaColors.comment,
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: draculaColors.currentLine,
            borderRight: `1px solid ${draculaColors.comment}`,
          },
        }}
      >
        <DrawerContent onNavClick={() => setMobileOpen(false)} />
      </Drawer>
    </>
  );
}
