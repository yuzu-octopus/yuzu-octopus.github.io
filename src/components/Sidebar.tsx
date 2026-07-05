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
import { Icon } from './Icon';
import { SITE } from '../data/site';
import { useScrollSpy } from '../hooks/useScrollSpy';

const navItems = [
  { text: 'Home', icon: <Icon name="home" />, href: '#hero' },
  { text: 'About', icon: <Icon name="person" />, href: '#about' },
  { text: 'Projects', icon: <Icon name="library_books" />, href: '#projects' },
  { text: 'Configs', icon: <Icon name="code" />, href: '#configs' },
  { text: 'Workspace', icon: <Icon name="desktop_mac" />, href: '#workspace' },
];

const sectionIds = ['hero', 'about', 'projects', 'configs', 'workspace'];

export const drawerWidth = 240;

function DrawerContent({ onNavClick, activeSection }: { onNavClick?: () => void; activeSection: string }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar
          src={SITE.avatarUrl}
          sx={{ width: 80, height: 80, margin: '0 auto', mb: 1 }}
        />
        <Typography variant="h6" sx={{ color: 'var(--purple)', fontWeight: 700 }}>
          yuzu
        </Typography>
        <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
          solo dev · ctf · configs
        </Typography>
      </Box>
      <Divider sx={{ borderColor: 'var(--muted)' }} />
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const isActive = item.href === `#${activeSection}`;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component="a"
                href={item.href}
                onClick={onNavClick}
                sx={{
                  borderRadius: '8px',
                  mx: 1,
                  backgroundColor: isActive ? 'color-mix(in srgb, var(--purple) 20%, transparent)' : 'transparent',
                  color: isActive ? 'var(--purple)' : 'var(--fg)',
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ borderColor: 'var(--muted)' }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemIcon sx={{ color: 'var(--fg)' }}>
              <Icon name="github" />
            </ListItemIcon>
            <ListItemText primary="GitHub" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: 'var(--muted)', display: 'block' }}>
          © 2026 {SITE.githubUsername}
        </Typography>
        <Typography variant="caption" sx={{ color: 'var(--muted)', display: 'block' }}>
          Powered by{' '}
          <Link href="https://pages.github.com" target="_blank" rel="noopener" sx={{ color: 'var(--purple)' }}>
            GitHub Pages
          </Link>
        </Typography>
        <Typography variant="caption" sx={{ color: 'var(--muted)', display: 'block' }}>
          Made with{' '}
          <Link href="https://vite.dev" target="_blank" rel="noopener" sx={{ color: 'var(--purple)' }}>
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
  const activeSection = useScrollSpy(sectionIds);

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
            backgroundColor: 'var(--panel)',
            borderRight: '1px solid var(--muted)',
          },
        }}
      >
        <DrawerContent activeSection={activeSection} />
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
          color: 'var(--fg)',
          backgroundColor: 'var(--panel)',
          border: '1px solid var(--muted)',
          '&:hover': {
            backgroundColor: 'var(--muted)',
          },
        }}
      >
        <Icon name="menu" />
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
            backgroundColor: 'var(--panel)',
            borderRight: '1px solid var(--muted)',
          },
        }}
      >
        <DrawerContent onNavClick={() => setMobileOpen(false)} activeSection={activeSection} />
      </Drawer>
    </>
  );
}
