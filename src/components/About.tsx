import { Container, Typography, Paper } from '@mui/material';
import { draculaColors } from '../theme/dracula';

export function About() {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: draculaColors.currentLine,
        padding: '4rem 0',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{ mb: 3, color: draculaColors.purple, borderBottom: `2px solid ${draculaColors.purple}`, pb: 1 }}
        >
          About Me
        </Typography>
        <Paper
          sx={{
            p: 3,
            backgroundColor: draculaColors.background,
            border: `1px solid ${draculaColors.comment}`,
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
    </section>
  );
}
