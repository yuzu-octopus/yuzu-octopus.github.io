import { Avatar, Typography, Button, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { draculaColors } from '../theme/dracula';

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: draculaColors.background,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Avatar
          src="https://avatars.githubusercontent.com/u/275212760?v=4"
          sx={{
            width: 150,
            height: 150,
            margin: '0 auto',
            mb: 3,
            border: `4px solid ${draculaColors.purple}`,
          }}
        />
        <Typography variant="h1" sx={{ fontSize: '3rem', mb: 1, color: draculaColors.purple }}>
          Hi, I'm yuzu
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 3, color: draculaColors.comment, fontWeight: 400 }}
        >
          Solo developer who loves CTFs and configuring everything.
        </Typography>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          href="https://github.com/yuzu-octopus"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: draculaColors.purple,
            color: draculaColors.foreground,
            fontFamily: "'JetBrains Mono', monospace",
            '&:hover': {
              backgroundColor: draculaColors.pink,
            },
          }}
        >
          View GitHub
        </Button>
      </Container>
    </section>
  );
}
