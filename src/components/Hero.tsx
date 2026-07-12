import { Avatar, Typography, Button, Container, Box } from '@mui/material';
import { GitHubIcon } from './GitHubIcon';
import { SITE } from '../data/site';

export function Hero() {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: { xs: 'auto', md: '100vh' },
        backgroundColor: 'var(--bg)',
        padding: { xs: '5rem 0 3rem', md: 0 },
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Avatar
          src={SITE.avatarUrl}
          sx={{
            width: { xs: 100, sm: 150 },
            height: { xs: 100, sm: 150 },
            margin: '0 auto',
            mb: 3,
            border: '4px solid var(--purple)',
          }}
        />
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', sm: '3rem' }, mb: 1, color: 'var(--purple)' }}>
          Hi, I'm yuzu
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 3, color: 'var(--muted)', fontWeight: 400 }}
        >
          Solo developer who loves CTFs and configuring everything.
        </Typography>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          href={SITE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: 'var(--purple)',
            color: 'var(--fg)',
            border: '1px solid transparent',
            fontFamily: '"JetBrainsMono Nerd Font", "JetBrains Mono", monospace',
            transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'var(--purple)',
              border: '1px solid var(--purple)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          View GitHub
        </Button>
      </Container>
    </Box>
  );
}
