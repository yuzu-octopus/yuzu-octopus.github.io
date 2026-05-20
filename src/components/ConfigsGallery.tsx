import { Container, Typography, Grid } from '@mui/material';
import { draculaColors } from '../theme/dracula';
import { configs } from '../data/configs';
import { ConfigCard } from './ConfigCard';
import { SectionHeading } from './SectionHeading';

export function ConfigsGallery() {
  return (
    <section
      id="configs"
      style={{
        minHeight: '100vh',
        padding: '4rem 0',
        backgroundColor: draculaColors.background,
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
          <Typography sx={{ color: draculaColors.comment, textAlign: 'center', py: 4 }}>
            No configurations to display yet.
          </Typography>
        )}
      </Container>
    </section>
  );
}
