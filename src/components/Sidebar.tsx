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
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import GitHubIcon from '@mui/icons-material/GitHub';
import { draculaColors } from '../theme/dracula';

const navItems = [
  { text: 'Home', icon: <HomeIcon />, href: '#hero' },
  { text: 'About', icon: <PersonIcon />, href: '#about' },
  { text: 'Configs', icon: <CodeIcon />, href: '#configs' },
  { text: 'Workspace', icon: <DesktopMacIcon />, href: '#workspace' },
];

export const drawerWidth = 240;

export function Sidebar() {
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
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar
          src="https://avatars.githubusercontent.com/u/275212760?v=4"
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
            <ListItemButton component="a" href={item.href}>
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
            href="https://github.com/yuzu-octopus"
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
      <Box
        sx={{
          p: 1.5,
          textAlign: 'center',
          borderTop: `1px solid ${draculaColors.comment}`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: draculaColors.comment,
            fontSize: '0.65rem',
            display: 'block',
            mb: 0.5,
          }}
        >
          © 2026 yuzu-octopus
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Link
            href="https://pages.github.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: draculaColors.comment,
              fontSize: '0.6rem',
              textDecoration: 'none',
              '&:hover': { color: draculaColors.purple },
            }}
          >
            Powered by GitHub Pages
          </Link>
          <Link
            href="https://vitejs.dev"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: draculaColors.comment,
              fontSize: '0.6rem',
              textDecoration: 'none',
              '&:hover': { color: draculaColors.purple },
            }}
          >
            Made with Vite
          </Link>
        </Box>
      </Box>
    </Drawer>
  );
}
