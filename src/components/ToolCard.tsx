import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { draculaColors } from '../theme/dracula';
import type { Tool } from '../data/tools';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: draculaColors.background,
        border: `1px solid ${draculaColors.comment}`,
        height: '100%',
        transition: 'border-color 0.2s',
        '&:hover': {
          borderColor: draculaColors.purple,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ color: draculaColors.cyan, mb: 1 }}>
            {tool.name}
          </Typography>
          {tool.url && (
            <IconButton
              size="small"
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: draculaColors.comment }}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Typography variant="body2" sx={{ color: draculaColors.comment }}>
          {tool.description}
        </Typography>

      </CardContent>
    </Card>
  );
}
