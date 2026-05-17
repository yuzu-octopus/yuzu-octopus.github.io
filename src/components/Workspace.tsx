import { Container, Typography, Grid } from '@mui/material';
import { draculaColors } from '../theme/dracula';
import { tools } from '../data/tools';
import { ToolCard } from './ToolCard';

export function Workspace() {
  return (
    <section
      id="workspace"
      style={{
        minHeight: '100vh',
        padding: '4rem 0',
        backgroundColor: draculaColors.currentLine,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{ mb: 4, color: draculaColors.purple, borderBottom: `2px solid ${draculaColors.purple}`, pb: 1 }}
        >
          Workspace
        </Typography>
        <Grid container spacing={2}>
          {tools.map((tool) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tool.id}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
