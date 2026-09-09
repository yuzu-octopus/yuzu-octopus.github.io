import { Grid } from '@astryxdesign/core/Grid';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { configs } from '../data/configs';
import { ConfigCard } from './ConfigCard';
import { SectionHeading } from './SectionHeading';

export function ConfigsGallery() {
  return (
    <Section id="configs">
      <VStack gap={4}>
        <SectionHeading>Configs</SectionHeading>
        {configs.length > 0 ? (
          <Grid columns={{ minWidth: 300, max: 2 }} gap={4}>
            {configs.map((config) => (
              <ConfigCard key={config.id} config={config} />
            ))}
          </Grid>
        ) : (
          <Text type="body" justify="center">
            No configurations to display yet.
          </Text>
        )}
      </VStack>
    </Section>
  );
}
