import { Grid } from '@astryxdesign/core/Grid';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { configs } from '../data/configs';
import { ConfigCard } from './ConfigCard';
import { SectionHeading } from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function ConfigsGallery() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Section id="configs" ref={sectionRef} className="reveal">
      <VStack gap={4}>
        <SectionHeading>Configs</SectionHeading>
        {configs.length > 0 ? (
          <Grid columns={{ minWidth: 300 }} gap={4}>
            {configs.map((config) => (
              <ConfigCard key={config.id} config={config} />
            ))}
          </Grid>
        ) : (
          <Text type="supporting" justify="center">
            No configurations to display yet.
          </Text>
        )}
      </VStack>
    </Section>
  );
}
