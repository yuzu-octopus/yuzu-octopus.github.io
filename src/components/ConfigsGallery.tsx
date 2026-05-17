import { Container, Typography, Grid } from '@mui/material';
import { draculaColors } from '../theme/dracula';
import { configs } from '../data/configs';
import { ConfigCard } from './ConfigCard';

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
        <Typography
          variant="h2"
          sx={{ mb: 4, color: draculaColors.purple, borderBottom: `2px solid ${draculaColors.purple}`, pb: 1 }}
        >
          Configs
        </Typography>
        <Grid container spacing={3}>
          {configs.map((config) => (
            <Grid size={{ xs: 12, md: 6 }} key={config.id}>
              <ConfigCard config={config} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}
