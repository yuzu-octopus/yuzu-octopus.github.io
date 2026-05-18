import { useState } from 'react';
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
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
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
  const lang = languageMap[config.language] || 'plaintext';

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
            p: 2,
            mb: 2,
            minHeight: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px dashed ${draculaColors.comment}`,
          }}
        >
          <Typography variant="caption" sx={{ color: draculaColors.comment }}>
            Screenshot: {config.name}
          </Typography>
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
                fontFamily: "'JetBrains Mono', monospace !important",
                fontSize: '0.8rem !important',
                lineHeight: '1.5 !important',
              },
            }}
          >
            <SyntaxHighlighter
              language={lang}
              style={dracula}
              customStyle={{
                margin: 0,
                borderRadius: 0,
              }}
              wrapLines
              wrapLongLines
            >
              {config.code}
            </SyntaxHighlighter>
          </Box>
        </Collapse>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
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
      </CardActions>
    </Card>
  );
}
