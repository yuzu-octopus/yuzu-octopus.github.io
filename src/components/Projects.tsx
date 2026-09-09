import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Section } from '@astryxdesign/core/Section';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { SectionHeading } from './SectionHeading';
import { projects } from '../data/projects';

export function Projects() {
  return (
    <Section id="projects">
      <VStack gap={4}>
        <SectionHeading lede="Things I built and maintain.">Projects</SectionHeading>
        {projects.length > 0 ? (
          <Grid columns={{ minWidth: 320, max: 3 }} gap={4}>
            {projects.map((project) => (
              <Card key={project.id}>
                <VStack gap={3}>
                  <HStack justify="start">
                    <Badge variant="cyan" label={project.language} />
                  </HStack>
                  <Heading level={3}>{project.name}</Heading>
                  <Text type="body" as="p" maxLines={3}>
                    {project.description}
                  </Text>
                  <HStack gap={2} wrap="wrap">
                    {project.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="yellow" label={feature} />
                    ))}
                  </HStack>
                  <Link href={project.githubUrl} isStandalone isExternalLink hasUnderline>
                    Repository
                  </Link>
                </VStack>
              </Card>
            ))}
          </Grid>
        ) : (
          <Text type="body" justify="center">
            No projects to display yet.
          </Text>
        )}
      </VStack>
    </Section>
  );
}
