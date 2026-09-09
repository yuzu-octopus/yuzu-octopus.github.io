import { Grid, GridSpan } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { tools } from '../data/tools';
import { ToolCard } from './ToolCard';
import { SectionHeading } from './SectionHeading';
import { useColumnCount } from '../hooks/useColumnCount';

export function Workspace() {
  const { ref, columns } = useColumnCount();
  // Span the last card only when the final row would otherwise hold exactly
  // one card (11 tools at 2 cols). Single column is already full width.
  const spanLast = columns > 1 && tools.length % columns === 1;
  return (
    <Section id="workspace">
      <VStack gap={4}>
        <SectionHeading lede="Daily drivers, from terminal to editor.">Workspace</SectionHeading>
        {tools.length > 0 ? (
          <Grid ref={ref} columns={{ minWidth: 240, max: 4 }} gap={3} align="start">
            {tools.map((tool, i) => (
              <GridSpan columns={i === tools.length - 1 && spanLast ? 'full' : undefined} key={tool.id}>
                <ToolCard tool={tool} />
              </GridSpan>
            ))}
          </Grid>
        ) : (
          <VStack gap={2} hAlign="center">
            <Heading level={3} justify="center">
              No tools yet
            </Heading>
            <Text type="body" justify="center">
              Everyday tools will appear here once they are added.
            </Text>
          </VStack>
        )}
      </VStack>
    </Section>
  );
}
