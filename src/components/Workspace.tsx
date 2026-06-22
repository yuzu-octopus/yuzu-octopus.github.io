import { Box, Container, Typography, Grid } from '@mui/material';
import { draculaColors } from '../theme/dracula';
import { tools, type ToolCategory } from '../data/tools';
import { ToolCard } from './ToolCard';
import { SectionHeading } from './SectionHeading';

const categorized = tools.reduce<Record<ToolCategory, typeof tools>>((acc, tool) => {
  (acc[tool.category] ??= []).push(tool);
  return acc;
}, {} as Record<ToolCategory, typeof tools>);

export function Workspace() {
  return (
    <Box
      component="section"
      id="workspace"
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        padding: '4rem 0',
        backgroundColor: draculaColors.currentLine,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeading>Workspace</SectionHeading>
        {Object.keys(categorized).length > 0 ? (
          Object.entries(categorized).map(([category, categoryTools]) => (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: draculaColors.pink, mb: 1 }}>
                {category}
              </Typography>
              <Grid container spacing={2}>
                {categoryTools.map((tool) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tool.id}>
                    <ToolCard tool={tool} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        ) : (
          <Typography sx={{ color: draculaColors.comment, textAlign: 'center', py: 4 }}>
            No tools configured yet.
          </Typography>
        )}
      </Container>
    </Box>
  );
}
