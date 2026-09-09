import { SideNav, SideNavHeading, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { VStack } from '@astryxdesign/core/Stack';
import { Braces, ExternalLink, FolderGit2, Home, SquareTerminal, User } from 'lucide-react';
import type { AnchorHTMLAttributes } from 'react';
import { SITE } from '../data/site';
import { useScrollSpy } from '../hooks/useScrollSpy';

function NewTabAnchor(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}

const sectionIds = ['hero', 'about', 'projects', 'configs', 'workspace'];

const navItems = [
  { text: 'Home', icon: <Home size={18} />, href: '#hero' },
  { text: 'About', icon: <User size={18} />, href: '#about' },
  { text: 'Projects', icon: <FolderGit2 size={18} />, href: '#projects' },
  { text: 'Configs', icon: <Braces size={18} />, href: '#configs' },
  { text: 'Workspace', icon: <SquareTerminal size={18} />, href: '#workspace' },
];

export function Sidebar() {
  const activeSection = useScrollSpy(sectionIds);

  return (
    <SideNav
      header={
        <SideNavHeading
          heading="yuzu"
          subheading="solo dev · ctf · configs"
          headingHref="#hero"
          icon={<Avatar src={SITE.avatarUrl} name="yuzu" size="lg" />}
        />
      }
      footer={
        <VStack gap={1}>
          <Text type="supporting">© 2026 {SITE.githubUsername}</Text>
          <Text type="supporting">
            Styled with <Link href="https://yuzu-octopus.github.io/astryx-dracula/">astryx-dracula</Link>
          </Text>
        </VStack>
      }
    >
      <SideNavSection title="Portfolio">
        {navItems.map((item) => (
          <SideNavItem
            key={item.text}
            label={item.text}
            href={item.href}
            icon={item.icon}
            isSelected={item.href === `#${activeSection}`}
          />
        ))}
      </SideNavSection>
      <SideNavSection title="Elsewhere">
        <SideNavItem label="GitHub" href={SITE.githubUrl} as={NewTabAnchor} icon={<ExternalLink size={18} />} />
      </SideNavSection>
    </SideNav>
  );
}
