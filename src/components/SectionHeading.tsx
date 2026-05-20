import { Typography } from '@mui/material';
import { draculaColors } from '../theme/dracula';

interface SectionHeadingProps {
  children: string;
  mb?: number;
}

export function SectionHeading({ children, mb = 4 }: SectionHeadingProps) {
  return (
    <Typography
      variant="h2"
      sx={{ mb, color: draculaColors.purple, borderBottom: `2px solid ${draculaColors.purple}`, pb: 1 }}
    >
      {children}
    </Typography>
  );
}
