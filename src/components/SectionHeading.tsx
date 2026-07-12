import { Typography } from '@mui/material';

interface SectionHeadingProps {
  children: string;
  mb?: number;
}

export function SectionHeading({ children, mb = 4 }: SectionHeadingProps) {
  return (
    <Typography
      variant="h2"
      sx={{
        mb,
        color: 'var(--purple)',
        fontSize: { xs: '1.2rem', md: '1.6rem' },
        borderBottom: '2px solid var(--purple)',
        pb: 1,
      }}
    >
      {children}
    </Typography>
  );
}
