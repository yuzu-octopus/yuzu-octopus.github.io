import { useState, lazy, Suspense } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Collapse,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { draculaSyntaxTheme } from '../theme/draculaSyntax';
import { useConfigCode } from '../hooks/useConfigCode';

const SyntaxHighlighter = lazy(() =>
  import('react-syntax-highlighter').then((m) => ({ default: m.Prism })),
);
import { draculaColors } from '../theme/dracula';
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
  nu: 'bash',
};

export function ConfigCard({ config }: ConfigCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const lang = languageMap[config.language] || 'plaintext';
  const { code: fetchedCode, loading, error } = useConfigCode(config.rawUrl, expanded);

  return (
    <Card
      sx={{
        backgroundColor: draculaColors.background,
        border: `1px solid ${draculaColors.comment}`,
        color: draculaColors.foreground,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ color: draculaColors.purple, mb: 1 }}>
          {config.name}
        </Typography>
        <Typography variant="body2" sx={{ color: draculaColors.comment, mb: 2 }}>
          {config.description}
        </Typography>
        <Box
          sx={{
            backgroundColor: draculaColors.currentLine,
            borderRadius: 1,
            p: 0,
            mb: 2,
            overflow: 'hidden',
            border: `1px solid ${draculaColors.comment}`,
          }}
        >
          {imgError ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
              <Typography variant="caption" sx={{ color: draculaColors.comment }}>
                Screenshot unavailable
              </Typography>
            </Box>
          ) : (
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
          )}
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              borderRadius: 1,
              overflow: 'auto',
              maxHeight: 400,
              border: `1px solid ${draculaColors.comment}`,
              '& pre': {
                margin: 0,
                padding: '1rem !important',
                background: `${draculaColors.background} !important`,
              },
              '& code': {
                fontFamily: "'JetBrainsMono Nerd Font', 'JetBrains Mono', monospace !important",
                fontSize: '0.8rem !important',
                lineHeight: '0.9 !important',
              },
            }}
          >
            <Suspense fallback={null}>
              {loading ? (
                <Box sx={{ p: 2, color: draculaColors.comment, fontFamily: "'JetBrainsMono Nerd Font', monospace", fontSize: '0.8rem' }}>
                  Loading source...
                </Box>
              ) : error ? (
                <Box sx={{ p: 2, color: draculaColors.red, fontFamily: "'JetBrainsMono Nerd Font', monospace", fontSize: '0.8rem' }}>
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
          sx={{ color: draculaColors.purple }}
        >
          {expanded ? 'Hide Source' : 'View Source'}
          <ExpandMoreIcon
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          />
        </Button>
        {config.sourceUrl && (
          <Button
            size="small"
            href={config.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
            sx={{ color: draculaColors.cyan }}
          >
            Full Config
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
