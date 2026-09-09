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
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Projects() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Section id="projects" ref={sectionRef} className="reveal">
      <VStack gap={4}>
        <SectionHeading lede="Things I built and maintain.">Projects</SectionHeading>
        {projects.length > 0 ? (
          <Grid columns={{ minWidth: 320 }} gap={4}>
            {projects.map((project) => (
              <Card key={project.id} className="hover-lift">
                <VStack gap={3}>
                  <Badge variant="cyan" label={project.language} />
                  <Heading level={3}>{project.name}</Heading>
                  <Text type="body" as="p" maxLines={3}>
                    {project.description}
                  </Text>
                  <HStack gap={2} wrap="wrap">
                    {project.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="yellow" label={feature} />
                    ))}
                  </HStack>
                  <Link href={project.githubUrl} isStandalone isExternalLink>
                    Repository
                  </Link>
                </VStack>
              </Card>
            ))}
          </Grid>
        ) : (
          <Text type="supporting" justify="center">
            No projects to display yet.
          </Text>
        )}
      </VStack>
    </Section>
  );
}
