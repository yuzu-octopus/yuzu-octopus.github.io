import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { Icon } from './Icon';
import type { Tool } from '../data/tools';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card
      className="hover-lift"
      sx={{
        backgroundColor: 'var(--panel)',
        borderRadius: '8px',
        border: '1px solid var(--muted)',
        height: '100%',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" sx={{ color: 'var(--cyan)', mb: 1 }}>
            {tool.name}
          </Typography>
          {tool.url && (
            <IconButton
              size="small"
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: 'var(--muted)' }}
            >
              <Icon name="open_in_new" size={20} />
            </IconButton>
          )}
        </Box>
        <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
          {tool.description}
        </Typography>

      </CardContent>
    </Card>
  );
}
