import { SideNav, SideNavCollapseButton, SideNavHeading, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Badge } from '@astryxdesign/core/Badge';
import { Braces, ExternalLink, FolderGit2, Home, SquareTerminal, User } from 'lucide-react';
import type { AnchorHTMLAttributes } from 'react';
import { useState } from 'react';
import { useMediaQuery } from '@astryxdesign/core/hooks';
import { SITE } from '../data/site';
import { configs } from '../data/configs';
import { projects } from '../data/projects';
import { tools } from '../data/tools';
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

const counts: Record<string, number> = {
  Projects: projects.length,
  Configs: configs.length,
  Workspace: tools.length,
};

export function Sidebar() {
  const activeSection = useScrollSpy(sectionIds);
  const [isCollapsed, setCollapsed] = useState(false);
  // The collapse toggle only exists on the desktop rail; the mobile drawer
  // always renders the full header, so collapsed chrome must never leak
  // into it. Footer text is dropped entirely: the main Footer owns attribution.
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const railCollapsed = isCollapsed && isDesktop;

  return (
    <SideNav
      collapsible={{ isCollapsed, onCollapsedChange: setCollapsed, hasButton: false }}
      footerIcons={<SideNavCollapseButton />}
      header={
        railCollapsed ? (
          <Avatar src={SITE.avatarUrl} name="yuzu" size="xsm" href="#hero" />
        ) : (
          <SideNavHeading
            heading="yuzu"
            subheading="solo dev · ctf · configs"
            headingHref="#hero"
            icon={<Avatar src={SITE.avatarUrl} name="yuzu" size="lg" />}
          />
        )
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
            endContent={counts[item.text] !== undefined ? <Badge label={counts[item.text]} /> : undefined}
          />
        ))}
      </SideNavSection>
      <SideNavSection title="Elsewhere">
        <SideNavItem label="GitHub" href={SITE.githubUrl} as={NewTabAnchor} icon={<ExternalLink size={18} />} />
      </SideNavSection>
    </SideNav>
  );
}
