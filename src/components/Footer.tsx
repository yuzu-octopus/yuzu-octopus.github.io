import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Link } from '@astryxdesign/core/Link';
import { Section } from '@astryxdesign/core/Section';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { ArrowUp } from 'lucide-react';
import { SITE } from '../data/site';

function scrollToHero() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduce ? 'instant' : 'smooth';
  // Hero renders outside Suspense, so it is always mounted: no lazy poll.
  document.getElementById('hero')?.scrollIntoView({ behavior });
}

export function Footer() {
  return (
    <Section>
      <Card padding={4}>
        <HStack justify="between" vAlign="center" wrap="wrap" gap={3}>
          <VStack gap={1}>
            <Text weight="semibold">yuzu</Text>
            <Text type="supporting">
              Built with React · styled with{' '}
              <Link
                href="https://yuzu-octopus.github.io/astryx-dracula/"
                type="inherit"
                hasUnderline
              >
                astryx-dracula
              </Link>{' '}
              · hosted on GitHub Pages · © 2026 {SITE.githubUsername}
            </Text>
          </VStack>
          <Button
            variant="ghost"
            label="Back to top"
            icon={<ArrowUp size={18} />}
            onClick={scrollToHero}
          />
        </HStack>
      </Card>
    </Section>
  );
}
