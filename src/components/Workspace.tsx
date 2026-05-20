import { Container, Typography, Grid } from '@mui/material';
import { draculaColors } from '../theme/dracula';
import { tools } from '../data/tools';
import { ToolCard } from './ToolCard';
import { SectionHeading } from './SectionHeading';

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
        <SectionHeading>Workspace</SectionHeading>
        {tools.length > 0 ? (
          <Grid container spacing={2}>
            {tools.map((tool) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tool.id}>
                <ToolCard tool={tool} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ color: draculaColors.comment, textAlign: 'center', py: 4 }}>
            No tools configured yet.
          </Typography>
        )}
      </Container>
    </section>
  );
}
