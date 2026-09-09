import { useEffect, useState } from 'react';
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
  spanFull?: boolean;
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

const PREVIEW_TIMEOUT_MS = 15000;

// Screenshot well with loader states: a stalled decode (large animated GIFs)
// or a missing file shows a message, never a blank well. The src is set
// only once the well nears the viewport, so below-fold previews cost
// nothing until scrolled to — and a hidden lazy img would never intersect,
// which is why gating replaces loading="lazy".
function ConfigPreview({ config }: { config: Config }) {
  // No-observer environments (jsdom) start visible: nothing to observe.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined');
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (visible || failed) return;
    const el = document.getElementById(`shot-${config.id}`);
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '256px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [config.id, config.screenshot, visible, failed]);

  // Timeout is a subscription, not a render sync: it only ever marks a
  // still-loading preview failed. React fires onLoad even for cache hits
  // because src is set on mount, after listeners attach.
  useEffect(() => {
    if (!visible || loaded || failed || !config.screenshot) return;
    const timer = setTimeout(() => setFailed(true), PREVIEW_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [config.id, config.screenshot, visible, loaded, failed]);

  if (!config.screenshot || failed) {
    return (
      <Card padding={3} className="shot-well">
        <Text type="supporting" justify="center">
          {config.screenshot ? 'Preview unavailable' : 'No preview available'}
        </Text>
      </Card>
    );
  }
  if (!visible) {
    return (
      <Card padding={3} className="shot-well" id={`shot-${config.id}`}>
        <Text type="supporting" justify="center">
          Loading preview…
        </Text>
      </Card>
    );
  }
  return (
    <>
      {!loaded && (
        <Card padding={3} className="shot-well" id={`shot-${config.id}`}>
          <Text type="supporting" justify="center">
            Loading preview…
          </Text>
        </Card>
      )}
      <img
        className="shot"
        src={config.screenshot}
        width={config.screenshotWidth}
        height={config.screenshotHeight}
        alt={`${config.name} screenshot`}
        decoding="async"
        hidden={!loaded}
        onLoad={() => {
          setLoaded(true);
          setFailed(false);
        }}
        onError={() => setFailed(true)}
      />
    </>
  );
}

export function ConfigCard({ config, spanFull }: ConfigCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);
  const lang = languageMap[config.language] || 'plaintext';
  const { code: fetchedCode, loading, error } = useConfigCode(config.rawUrl, expanded, retryNonce);

  return (
    <GridSpan columns={expanded || spanFull ? 'full' : undefined}>
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
          <ConfigPreview config={config} />
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
