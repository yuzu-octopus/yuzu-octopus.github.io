import { Badge } from '@astryxdesign/core/Badge';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { tools, type ToolCategory } from '../data/tools';
import { ToolCard } from './ToolCard';
import { SectionHeading } from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

const categorized = tools.reduce<Record<ToolCategory, typeof tools>>((acc, tool) => {
  (acc[tool.category] ??= []).push(tool);
  return acc;
}, {} as Record<ToolCategory, typeof tools>);

const categoryBadge: Record<ToolCategory, 'cyan' | 'green' | 'purple' | 'yellow' | 'pink'> = {
  Terminal: 'green',
  Editor: 'purple',
  Languages: 'cyan',
  Runtime: 'yellow',
  Messaging: 'pink',
};

export function Workspace() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Section id="workspace" ref={sectionRef} className="reveal">
      <VStack gap={4}>
        <SectionHeading>Workspace</SectionHeading>
        {Object.keys(categorized).length > 0 ? (
          Object.entries(categorized).map(([category, categoryTools]) => (
            <VStack key={category} gap={3}>
              <Heading level={3} color="accent">
                {category}{' '}
                <Badge variant={categoryBadge[category as ToolCategory]} label={`${categoryTools.length} tools`} />
              </Heading>
              <Grid columns={{ minWidth: 240 }} gap={3}>
                {categoryTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </Grid>
            </VStack>
          ))
        ) : (
          <Text type="supporting" justify="center">
            No tools configured yet.
          </Text>
        )}
      </VStack>
    </Section>
  );
}
