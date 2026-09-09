import { Button } from '@astryxdesign/core/Button';
import { Link } from '@astryxdesign/core/Link';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { ArrowUp } from 'lucide-react';
import { SITE } from '../data/site';
import { useScrollReveal } from '../hooks/useScrollReveal';

function scrollToHero() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduce ? 'instant' : 'smooth';
  // Hero renders outside Suspense, so it is always mounted: no lazy poll.
  document.getElementById('hero')?.scrollIntoView({ behavior });
}

export function Footer() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Section ref={sectionRef} className="reveal">
      <VStack gap={2} hAlign="center">
        <Text type="supporting" justify="center">
          Built with React · styled with{' '}
          <Link href="https://yuzu-octopus.github.io/astryx-dracula/">astryx-dracula</Link> · hosted on
          GitHub Pages
        </Text>
        <Text type="supporting" justify="center">
          © 2026 {SITE.githubUsername}
        </Text>
        <Button variant="ghost" label="Back to top" icon={<ArrowUp size={18} />} onClick={scrollToHero} />
      </VStack>
    </Section>
  );
}
