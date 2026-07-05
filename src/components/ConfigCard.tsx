import { useState, lazy, Suspense } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Collapse,
  Box,
  IconButton,
} from '@mui/material';
import { Icon } from './Icon';
import { draculaSyntaxTheme } from '../theme/draculaSyntax';
import { useConfigCode } from '../hooks/useConfigCode';

const SyntaxHighlighter = lazy(() =>
  import('react-syntax-highlighter').then((m) => ({ default: m.Prism })),
);
import type { Config } from '../data/configs';

interface ConfigCardProps {
  config: Config;
}

const languageMap: Record<string, string> = {
  json: 'json',
  jsonc: 'json',
  toml: 'toml',
  ini: 'ini',
  yaml: 'yaml',
  sh: 'bash',
  nu: 'plaintext',
};

export function ConfigCard({ config }: ConfigCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const lang = languageMap[config.language] || 'plaintext';
  const { code: fetchedCode, loading, error } = useConfigCode(config.rawUrl, expanded);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (fetchedCode) {
      await navigator.clipboard.writeText(fetchedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card
      className="hover-lift"
      sx={{
        backgroundColor: 'var(--panel)',
        borderRadius: '8px',
        border: '1px solid var(--muted)',
        color: 'var(--fg)',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ color: 'var(--purple)', mb: 1 }}>
          {config.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 2 }}>
          {config.description}
        </Typography>
        <Box
          sx={{
            backgroundColor: 'var(--panel)',
            borderRadius: 1,
            p: 0,
            mb: 2,
            overflow: 'hidden',
            border: '1px solid var(--muted)',
          }}
        >
          {config.screenshot && !imgError ? (
            <img
              src={config.screenshot}
              alt={config.name}
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
              onError={() => setImgError(true)}
            />
          ) : !config.screenshot ? null : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography variant="caption" sx={{ color: 'var(--muted)' }}>
                Screenshot unavailable
              </Typography>
            </Box>
          )}
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              overflow: 'auto',
              maxHeight: { xs: 250, sm: 400 },
              border: '1px solid var(--muted)',
              '& pre': {
                margin: 0,
                padding: '1rem !important',
                background: 'var(--bg) !important',
              },
              '& code': {
                fontFamily: "'JetBrainsMono Nerd Font', 'JetBrains Mono', monospace !important",
                fontSize: '0.8rem !important',
                lineHeight: '0.9 !important',
              },
            }}
          >
            {fetchedCode && (
              <IconButton
                onClick={handleCopy}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                  backgroundColor: 'var(--panel)',
                  '&:hover': { backgroundColor: 'var(--purple)' },
                }}
              >
                <Icon name={copied ? 'check' : 'content_copy'} size={16} />
              </IconButton>
            )}
            <Suspense fallback={null}>
              {loading ? (
                <Box sx={{ p: 2, color: 'var(--muted)', fontFamily: "'JetBrainsMono Nerd Font', monospace", fontSize: '0.8rem' }}>
                  Loading source...
                </Box>
              ) : error ? (
                <Box sx={{ p: 2, color: 'var(--red)', fontFamily: "'JetBrainsMono Nerd Font', monospace", fontSize: '0.8rem' }}>
                  Failed to load source: {error}
                </Box>
              ) : fetchedCode ? (
                <SyntaxHighlighter
                  language={lang}
                  style={draculaSyntaxTheme}
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                  }}
                  wrapLines
                  wrapLongLines
                >
                  {fetchedCode}
                </SyntaxHighlighter>
              ) : null}
            </Suspense>
          </Box>
        </Collapse>
      </CardContent>
      <CardActions sx={{ justifyContent: config.sourceUrl ? 'space-between' : 'flex-start' }}>
        <Button
          size="small"
          onClick={() => setExpanded(!expanded)}
          sx={{ color: 'var(--purple)' }}
        >
          {expanded ? 'Hide Source' : 'View Source'}
          <Icon name="expand_more" size={20} />
        </Button>
        {config.sourceUrl && (
          <Button
            size="small"
            href={config.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<Icon name="open_in_new" size={18} />}
            sx={{ color: 'var(--cyan)' }}
          >
            Full Config
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
