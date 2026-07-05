import { Container, Typography, Paper, Box } from '@mui/material';
import { SectionHeading } from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function About() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Box
      component="section"
      id="about"
      ref={sectionRef}
      className="reveal"
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--panel)',
        padding: '4rem 0',
      }}
    >
      <Container maxWidth="md">
        <SectionHeading mb={3}>About Me</SectionHeading>
        <Paper
          sx={{
            p: 3,
            backgroundColor: 'var(--bg)',
            border: '1px solid var(--muted)',
          }}
        >
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
            I'm a solo developer passionate about security, CTFs, and crafting the perfect
            development environment. I believe that the tools you use shape how you think,
            which is why I spend time configuring everything from my terminal to my editor.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            When I'm not solving CTF challenges or writing exploit scripts, you'll find me
            tweaking dotfiles, exploring new tools, or building projects with Python and
            JavaScript. I use Ghostty as my terminal, OpenCode as my AI coding assistant,
            and Zed for quick edits.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
