import { Container, Typography, Card, CardContent, Button, Box, Chip } from '@mui/material';
import { Icon } from './Icon';
import { draculaColors } from '../theme/dracula';
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
        minHeight: { xs: 'auto', md: '100vh' },
        padding: '4rem 0',
        backgroundColor: draculaColors.background,
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
                backgroundColor: draculaColors.currentLine,
                borderRadius: '8px',
                border: `1px solid ${draculaColors.comment}`,
                mb: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: draculaColors.cyan, mb: 1, fontWeight: 700 }}
                >
                  {project.name}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: draculaColors.foreground, mb: 2, lineHeight: 1.8 }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {project.features.map((feature, i) => (
                    <Chip
                      key={i}
                      label={feature}
                      sx={{
                        backgroundColor: draculaColors.currentLine,
                        color: draculaColors.purple,
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
                      color: draculaColors.purple,
                      border: `1px solid ${draculaColors.purple}`,
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
                      color: draculaColors.cyan,
                      borderColor: draculaColors.cyan,
                      fontFamily: "'JetBrainsMono Nerd Font', 'JetBrains Mono', monospace",
                      transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1), background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        borderColor: draculaColors.pink,
                        color: draculaColors.pink,
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
          <Typography sx={{ color: draculaColors.comment, textAlign: 'center', py: 4 }}>
            No projects to display yet.
          </Typography>
        )}
      </Container>
    </Box>
  );
}
