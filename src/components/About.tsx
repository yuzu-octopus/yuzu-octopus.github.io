import { Section } from '@astryxdesign/core/Section';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/Stack';
import { SectionHeading } from './SectionHeading';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function About() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <Section id="about" ref={sectionRef} className="reveal" maxWidth="75ch">
      <VStack gap={4}>
        <SectionHeading>About Me</SectionHeading>
        <VStack gap={3}>
          <Text type="body" as="p">
            I&apos;m a solo developer passionate about security, CTFs, and crafting the perfect
            development environment. I believe that the tools you use shape how you think,
            which is why I spend time configuring everything from my terminal to my editor.
          </Text>
          <Text type="body" as="p">
            When I&apos;m not solving CTF challenges or writing exploit scripts, you&apos;ll find me
            tweaking dotfiles, exploring new tools, or building projects with Python and
            JavaScript. I use Ghostty as my terminal, OpenCode as my AI coding assistant,
            and Zed for quick edits.
          </Text>
        </VStack>
      </VStack>
    </Section>
  );
}
