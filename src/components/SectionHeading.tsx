import { Heading } from '@astryxdesign/core/Heading';
import { Divider } from '@astryxdesign/core/Divider';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';

interface SectionHeadingProps {
  children: string;
  lede?: string;
}

export function SectionHeading({ children, lede }: SectionHeadingProps) {
  return (
    <VStack gap={2}>
      <Heading level={2} type="display-3" color="accent">
        {children}
      </Heading>
      {lede ? <Text type="body">{lede}</Text> : null}
      <Divider />
    </VStack>
  );
}
