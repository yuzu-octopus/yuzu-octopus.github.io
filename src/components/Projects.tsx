import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Grid, GridSpan } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Section } from '@astryxdesign/core/Section';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { SectionHeading } from './SectionHeading';
import { projects } from '../data/projects';
import { useColumnCount } from '../hooks/useColumnCount';

export function Projects() {
  const { ref, columns } = useColumnCount();
  // Span the last card only when the final row would otherwise hold exactly
  // one card (4 items at 3 cols). Single column is already full width.
  const spanLast = columns > 1 && projects.length % columns === 1;
  return (
    <Section id="projects">
      <VStack gap={4}>
        <SectionHeading lede="Things I built and maintain.">Projects</SectionHeading>
        {projects.length > 0 ? (
          <Grid ref={ref} columns={{ minWidth: 320, max: 3 }} gap={4} align="start">
            {projects.map((project, i) => (
              <GridSpan columns={i === projects.length - 1 && spanLast ? 'full' : undefined} key={project.id}>
              <Card>
                <VStack gap={3}>
                  <HStack justify="start">
                    <Badge variant="cyan" label={project.language} />
                  </HStack>
                  <Heading level={3}>{project.name}</Heading>
                  <Text type="body" as="p" maxLines={3}>
                    {project.description}
                  </Text>
                  <HStack gap={2} wrap="wrap">
                    {project.features.map((feature) => (
                      <Badge key={feature} variant="yellow" label={feature} />
                    ))}
                  </HStack>
                  <Link href={project.githubUrl} isStandalone isExternalLink hasUnderline>
                    Repository
                  </Link>
                </VStack>
              </Card>
              </GridSpan>
            ))}
          </Grid>
        ) : (
          <VStack gap={2} hAlign="center">
            <Heading level={3} justify="center">
              No projects yet
            </Heading>
            <Text type="body" justify="center">
              Published work will appear here once it is ready to show.
            </Text>
          </VStack>
        )}
      </VStack>
    </Section>
  );
}
