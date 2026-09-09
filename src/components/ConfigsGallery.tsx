import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
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
          <Grid columns={{ minWidth: 300, max: 2 }} gap={4} align="start">
            {configs.map((config) => (
              <ConfigCard key={config.id} config={config} />
            ))}
          </Grid>
        ) : (
          <VStack gap={2} hAlign="center">
            <Heading level={3} justify="center">
              No configurations yet
            </Heading>
            <Text type="body" justify="center">
              Dotfile showcases will appear here once they are published.
            </Text>
          </VStack>
        )}
      </VStack>
    </Section>
  );
}
