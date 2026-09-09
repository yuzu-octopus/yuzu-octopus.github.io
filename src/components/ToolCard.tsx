import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import type { Tool } from '../data/tools';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="hover-lift">
      <VStack gap={2}>
        <HStack gap={2} vAlign="center" justify="between">
          <Heading level={4}>{tool.name}</Heading>
          {tool.url && (
            <Link href={tool.url} label={`Open ${tool.name} (opens in new tab)`} isStandalone isExternalLink>
              Open
            </Link>
          )}
        </HStack>
        <Text type="supporting" as="p">
          {tool.description}
        </Text>
      </VStack>
    </Card>
  );
}
