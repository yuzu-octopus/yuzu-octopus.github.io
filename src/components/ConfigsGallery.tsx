import { Container, Typography, Grid, Box } from '@mui/material';
import { configs } from '../data/configs';
import { ConfigCard } from './ConfigCard';
import { SectionHeading } from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function ConfigsGallery() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Box
      component="section"
      id="configs"
      ref={sectionRef}
      className="reveal"
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        padding: '4rem 0',
        backgroundColor: 'var(--bg)',
      }}
    >
      <Container maxWidth="lg">
        <SectionHeading>Configs</SectionHeading>
        {configs.length > 0 ? (
          <Grid container spacing={3}>
            {configs.map((config) => (
              <Grid size={{ xs: 12, md: 6 }} key={config.id}>
                <ConfigCard config={config} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ color: 'var(--muted)', textAlign: 'center', py: 4 }}>
            No configurations to display yet.
          </Typography>
        )}
      </Container>
    </Box>
  );
}
