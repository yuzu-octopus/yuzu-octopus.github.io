import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { ExternalLink } from 'lucide-react';
import type { Tool, ToolCategory } from '../data/tools';

const categoryBadge: Record<ToolCategory, 'cyan' | 'green' | 'purple' | 'yellow' | 'pink'> = {
  Terminal: 'green',
  Editor: 'purple',
  Languages: 'cyan',
  Runtime: 'yellow',
  Messaging: 'pink',
};

interface ToolCardProps {
  tool: Tool;
  showCategory?: boolean;
}

export function ToolCard({ tool, showCategory = true }: ToolCardProps) {
  return (
    <Card className="hover-lift">
      <VStack gap={2}>
        <HStack gap={2} vAlign="center" justify="between">
          <HStack gap={2} vAlign="center" wrap="wrap">
            <Heading level={4}>{tool.name}</Heading>
            {showCategory && <Badge variant={categoryBadge[tool.category]} label={tool.category} />}
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
