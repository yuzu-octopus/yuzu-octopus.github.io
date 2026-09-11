import { Avatar } from '@astryxdesign/core/Avatar';
import { Badge } from '@astryxdesign/core/Badge';
import { Button } from '@astryxdesign/core/Button';
import { Divider } from '@astryxdesign/core/Divider';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Section } from '@astryxdesign/core/Section';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { ExternalLink } from 'lucide-react';
import { SITE } from '../data/site';
import { ConfigCard } from './ConfigCard';
import { configs } from '../data/configs';
import { SiteStats } from './SiteStats';

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

const featured = configs.slice(0, 4);

export function Hero() {
  return (
    <Section id="hero" padding={10}>
      <VStack gap={6}>
        {/* Side-gallery split: intro left, featured configs right */}
        <Grid columns={{ minWidth: 360, max: 2 }} gap={8} align="center">
          <VStack gap={4}>
            <VStack gap={2}>
              <Text type="supporting" weight="semibold">
                SOLO DEV · CTF · DOTFILES
              </Text>
              <HStack gap={3} vAlign="center" wrap="wrap">
                <Avatar src={SITE.avatarUrl} name="yuzu" size={64} />
                <Heading level={1} type="display-1" color="accent">
                  Hi, I&apos;m yuzu
                </Heading>
              </HStack>
              <Text type="large" textWrap="balance">
                Solo developer who loves CTFs and configuring everything.
              </Text>
            </VStack>
            <HStack gap={2} wrap="wrap">
              <Badge variant="yellow" label="ctf" />
              <Badge variant="green" label="dotfiles" />
              <Badge variant="cyan" label="open source" />
            </HStack>
            <HStack gap={3} vAlign="center" wrap="wrap">
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
          <Grid columns={{ minWidth: 240, max: 2 }} gap={3}>
            {featured.map((config) => (
              <ConfigCard key={config.id} config={config} />
            ))}
          </Grid>
        </Grid>
        <Divider />
        <SiteStats />
      </VStack>
    </Section>
  );
}
