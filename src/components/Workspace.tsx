import { Grid } from '@astryxdesign/core/Grid';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { tools } from '../data/tools';
import { ToolCard } from './ToolCard';
import { SectionHeading } from './SectionHeading';

export function Workspace() {
  return (
    <Section id="workspace">
      <VStack gap={4}>
        <SectionHeading lede="Daily drivers, from terminal to editor.">Workspace</SectionHeading>
        {tools.length > 0 ? (
          <Grid columns={{ minWidth: 240, max: 4 }} gap={3}>
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </Grid>
        ) : (
          <Text type="body" justify="center">
            No tools configured yet.
          </Text>
        )}
      </VStack>
    </Section>
  );
}
