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
import { draculaColors } from '../theme/dracula';
import type { Config } from '../data/configs';

interface ConfigCardProps {
  config: Config;
}

export function ConfigCard({ config }: ConfigCardProps) {
  const [expanded, setExpanded] = useState(false);

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
              backgroundColor: '#1e1f29',
              borderRadius: 1,
              p: 2,
              overflow: 'auto',
              maxHeight: 400,
              border: `1px solid ${draculaColors.comment}`,
            }}
          >
            <pre
              style={{
                margin: 0,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                lineHeight: 1.5,
                color: draculaColors.foreground,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {config.code}
            </pre>
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
