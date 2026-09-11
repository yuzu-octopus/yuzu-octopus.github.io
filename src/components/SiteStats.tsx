import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { configs } from '../data/configs';
import { projects } from '../data/projects';
import { tools } from '../data/tools';

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <VStack gap={0}>
      <Text type="large" weight="semibold" hasTabularNumbers>
        {value}
      </Text>
      <Text type="supporting" color="secondary">
        {label}
      </Text>
    </VStack>
  );
}

export function SiteStats() {
  return (
    <HStack gap={6}>
      <StatBlock value={String(projects.length)} label="Projects" />
      <StatBlock value={String(configs.length)} label="Configs" />
      <StatBlock value={String(tools.length)} label="Tools" />
    </HStack>
  );
}
