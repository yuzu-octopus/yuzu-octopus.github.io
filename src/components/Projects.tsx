import { Container, Typography, Card, CardContent, Button, Box, Chip } from '@mui/material';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';
import { projects } from '../data/projects';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Projects() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Box
      component="section"
      id="projects"
      ref={sectionRef}
      className="reveal"
      sx={{
        padding: { xs: '3rem 0', md: '3rem 0' },
        backgroundColor: 'var(--bg)',
      }}
    >
      <Container maxWidth="md">
        <SectionHeading mb={3}>Projects</SectionHeading>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card
              key={project.id}
              className="hover-lift"
              sx={{
                backgroundColor: 'var(--panel)',
                borderRadius: '8px',
                border: '1px solid var(--muted)',
                mb: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: 'var(--cyan)', mb: 1, fontWeight: 700 }}
                >
                  {project.name}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: 'var(--muted)', mb: 2, lineHeight: 1.8 }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {project.features.map((feature, i) => (
                    <Chip
                      key={i}
                      label={feature}
                      sx={{
                        backgroundColor: 'var(--panel)',
                        color: 'var(--purple)',
                        fontFamily: "'JetBrainsMono Nerd Font', 'JetBrains Mono', monospace",
                      }}
                    />
                  ))}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  <Chip
                    label={project.language}
                    size="small"
                    sx={{
                      backgroundColor: 'transparent',
                      color: 'var(--purple)',
                      border: '1px solid var(--purple)',
                      fontFamily: "'JetBrainsMono Nerd Font', 'JetBrains Mono', monospace",
                    }}
                  />

                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Icon name="open_in_new" size={18} />}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'var(--cyan)',
                      borderColor: 'var(--cyan)',
                      fontFamily: "'JetBrainsMono Nerd Font', 'JetBrains Mono', monospace",
                      transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: 'var(--pink)',
                        color: 'var(--pink)',
                        backgroundColor: 'color-mix(in srgb, var(--pink) 8%, transparent)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    View on GitHub
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography sx={{ color: 'var(--muted)', textAlign: 'center', py: 4 }}>
            No projects to display yet.
          </Typography>
        )}
      </Container>
    </Box>
  );
}
