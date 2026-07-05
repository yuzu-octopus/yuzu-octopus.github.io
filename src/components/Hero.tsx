import { Avatar, Typography, Button, Container, Box } from '@mui/material';
import { Icon } from './Icon';
import { draculaColors } from '../theme/dracula';
import { SITE } from '../data/site';

export function Hero() {
  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: draculaColors.background,
        padding: { xs: '4rem 0', md: 0 },
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
            border: `4px solid ${draculaColors.purple}`,
          }}
        />
        <Typography variant="h1" sx={{ fontSize: { xs: '2rem', sm: '3rem' }, mb: 1, color: draculaColors.purple }}>
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
          startIcon={<Icon name="github" />}
          href={SITE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            backgroundColor: draculaColors.purple,
            color: draculaColors.foreground,
            border: '1px solid transparent',
            fontFamily: '"JetBrainsMono Nerd Font", "JetBrains Mono", monospace',
            transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: 'transparent',
              color: draculaColors.purple,
              border: `1px solid ${draculaColors.purple}`,
            },
          }}
        >
          View GitHub
        </Button>
      </Container>
    </Box>
  );
}
