import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { ExternalLink } from 'lucide-react';
import type { Tool, ToolCategory } from '../data/tools';

// Category badges, never status: blue/purple reserved, info is cyan.
const categoryBadge: Record<ToolCategory, 'cyan' | 'green' | 'pink' | 'yellow' | 'orange'> = {
  Terminal: 'green',
  Editor: 'pink',
  Languages: 'cyan',
  Runtime: 'yellow',
  Messaging: 'orange',
};

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card>
      <VStack gap={2}>
        <HStack gap={2} vAlign="center" justify="between">
          <HStack gap={2} vAlign="center" wrap="wrap">
            <Heading level={3}>{tool.name}</Heading>
            <Badge variant={categoryBadge[tool.category]} label={tool.category} />
          </HStack>
          {tool.url && (
            <Link href={tool.url} label={`Open ${tool.name} (opens in new tab)`} tooltip={tool.name} target="_blank" className="icon-hit">
              <ExternalLink size={16} />
            </Link>
          )}
        </HStack>
        <Text type="body" as="p">
          {tool.description}
        </Text>
      </VStack>
    </Card>
  );
}
