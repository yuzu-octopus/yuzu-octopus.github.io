import { Heading } from '@astryxdesign/core/Heading';
import { Divider } from '@astryxdesign/core/Divider';
import { VStack } from '@astryxdesign/core/Stack';

interface SectionHeadingProps {
  children: string;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <VStack gap={2}>
      <Heading level={2} color="accent">
        {children}
      </Heading>
      <Divider />
    </VStack>
  );
}
