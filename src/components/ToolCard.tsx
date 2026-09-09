import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { ExternalLink } from 'lucide-react';
import type { Tool, ToolCategory } from '../data/tools';

const categoryBadge: Record<ToolCategory, 'cyan' | 'green' | 'blue' | 'yellow' | 'pink'> = {
  Terminal: 'green',
  Editor: 'blue',
  Languages: 'cyan',
  Runtime: 'yellow',
  Messaging: 'pink',
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
