import { Grid } from '@astryxdesign/core/Grid';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { tools } from '../data/tools';
import { ToolCard } from './ToolCard';
import { SectionHeading } from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Workspace() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Section id="workspace" ref={sectionRef} className="reveal">
      <VStack gap={4}>
        <SectionHeading lede="Daily drivers, from terminal to editor.">Workspace</SectionHeading>
        {tools.length > 0 ? (
          <Grid columns={{ minWidth: 240 }} gap={3}>
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </Grid>
        ) : (
          <Text type="supporting" justify="center">
            No tools configured yet.
          </Text>
        )}
      </VStack>
    </Section>
  );
}
