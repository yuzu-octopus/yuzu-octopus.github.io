import { useState } from 'react';
import { Badge } from '@astryxdesign/core/Badge';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { CodeBlock } from '@astryxdesign/core/CodeBlock';
import { GridSpan } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { HStack, VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Config, ConfigLanguage } from '../data/configs';
import { useConfigCode } from '../hooks/useConfigCode';

interface ConfigCardProps {
  config: Config;
}

const languageMap: Record<ConfigLanguage, string> = {
  json: 'json',
  jsonc: 'json',
  toml: 'toml',
  ini: 'ini',
  yaml: 'yaml',
  sh: 'bash',
  // No Nushell grammar in the highlighter; plaintext beats wrong colors.
  nu: 'plaintext',
};

export function ConfigCard({ config }: ConfigCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);
  const lang = languageMap[config.language] || 'plaintext';
  const { code: fetchedCode, loading, error } = useConfigCode(config.rawUrl, expanded, retryNonce);

  return (
    <GridSpan columns={expanded ? 'full' : undefined}>
      <Card>
        <VStack gap={3}>
          <VStack gap={2}>
            <HStack gap={2} vAlign="center">
              <Heading level={3}>{config.name}</Heading>
              <Badge variant="yellow" label={config.language} />
            </HStack>
            <Text type="body" as="p">
              {config.description}
            </Text>
          </VStack>
          {config.screenshot &&
            (imgError ? (
              <Text type="supporting" justify="center">
                Screenshot unavailable
              </Text>
            ) : (
              <img
                className="shot"
                src={config.screenshot}
                alt={`${config.name} screenshot`}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
              />
            ))}
          {expanded && (
            <Text as="div" aria-live="polite">
              {loading ? (
                <Text type="supporting">Loading source…</Text>
              ) : error ? (
                <Banner
                  status="error"
                  title="Source failed to load"
                  description={error}
                  container="section"
                  endContent={
                    <Button
                      variant="secondary"
                      size="sm"
                      label="Retry loading source"
                      onClick={() => setRetryNonce((n) => n + 1)}
                    >
                      Retry
                    </Button>
                  }
                />
              ) : fetchedCode ? (
                <CodeBlock
                  code={fetchedCode}
                  language={lang}
                  title={config.name}
                  hasLineNumbers
                  width="100%"
                  maxHeight={400}
                  container="section"
                />
              ) : (
                <Text type="body">Source is empty.</Text>
              )}
            </Text>
          )}
          <HStack gap={2} wrap="wrap">
            <Button
              variant="ghost"
              size="sm"
              label={expanded ? 'Hide code' : 'Preview code'}
              icon={expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              onClick={() => setExpanded(!expanded)}
            />
            {config.sourceUrl && (
              <Link href={config.sourceUrl} isStandalone isExternalLink hasUnderline>
                Full config
              </Link>
            )}
          </HStack>
        </VStack>
      </Card>
    </GridSpan>
  );
}
