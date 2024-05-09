import type { StoryObj, Meta } from '@storybook/react'
import { Box, BoxProps, Text } from '@ignite-ui/react'

export default {
  title: 'Surfaces/Box',
  component: Box,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <Text>Testing Box element</Text>
      </>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {}
