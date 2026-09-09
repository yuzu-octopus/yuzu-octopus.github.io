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
import { useEffect, useRef, useState } from 'react';

// The last card spans the full row only when the grid resolves to a column
// count that would otherwise strand it (3 cols: 3+1). At 2 cols (2+2) and
// 1 col the span would punch a hole, so measure instead of breakpoint math.
function useColumnCount() {
  const ref = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const measure = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      if (kids.length === 0) return;
      const top = kids[0].offsetTop;
      setColumns(kids.filter((k) => k.offsetTop === top).length || 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, columns };
}

export function Projects() {
  const { ref, columns } = useColumnCount();
  const spanLast = columns !== 2;
  return (
    <Section id="projects">
      <VStack gap={4}>
        <SectionHeading lede="Things I built and maintain.">Projects</SectionHeading>
        {projects.length > 0 ? (
          <Grid ref={ref} columns={{ minWidth: 320, max: 3 }} gap={4}>
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
                    {project.features.slice(0, 3).map((feature) => (
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
          <Text type="body" justify="center">
            No projects to display yet.
          </Text>
        )}
      </VStack>
    </Section>
  );
}
