import { Avatar } from '@astryxdesign/core/Avatar';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Heading } from '@astryxdesign/core/Heading';
import { Section } from '@astryxdesign/core/Section';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { ExternalLink } from 'lucide-react';
import { SITE } from '../data/site';

function scrollToSection(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduce ? 'instant' : 'smooth';
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior });
    return;
  }
  // Lazy sections may not be in the DOM yet; poll briefly, then give up.
  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    const target = document.getElementById(id);
    if (target || attempts > 10) {
      clearInterval(timer);
      target?.scrollIntoView({ behavior });
    }
  }, 200);
}

export function Hero() {
  return (
    <Section id="hero" padding={10}>
      <VStack gap={4} hAlign="center">
        <Avatar src={SITE.avatarUrl} name="yuzu" size={144} />
        <VStack gap={2} hAlign="center">
          <Heading level={1} type="display-1" color="accent" justify="center">
            Hi, I&apos;m yuzu
          </Heading>
          <Text type="large" justify="center" textWrap="balance">
            Solo developer who loves CTFs and configuring everything.
          </Text>
        </VStack>
        <HStack gap={2} justify="center" wrap="wrap">
          <Badge variant="yellow" label="ctf" />
          <Badge variant="green" label="dotfiles" />
          <Badge variant="cyan" label="open source" />
        </HStack>
        <HStack gap={2} justify="center" wrap="wrap">
          <Button
            variant="primary"
            size="lg"
            label="View GitHub"
            icon={<ExternalLink size={18} />}
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          />
          <Button
            variant="secondary"
            size="lg"
            label="Browse configs"
            onClick={() => scrollToSection('configs')}
          />
        </HStack>
      </VStack>
    </Section>
  );
}
