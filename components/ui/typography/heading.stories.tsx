import type { Meta, StoryObj } from '@storybook/react'
import { DisplaySize, Heading, Weight } from '@/components/ui/typography/heading'

// Meta
export default {
  title: 'UI/Typography/Heading',
  component: Heading,
  argTypes: {
    as: {
      description: 'Specifies the HTML heading element to render, controlling semantic structure.',
      control: {
        type: 'select',
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      },
      table: {
        type: { summary: '"h1" | "h2" | "h3" | "h4" | "h5" | "h6"' },
        defaultValue: { summary: 'h1' },
      },
    },
    size: {
      description:
        'Sets the visual size of the heading, independent of the HTML element, for consistent typography scaling.',
      control: {
        type: 'select',
        options: ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'],
      },
      table: {
        type: { summary: '"2xl" | "xl" | "lg" | "md" | "sm" | "xs"' },
        defaultValue: { summary: 'md' },
      },
    },
    weight: {
      description:
        'Controls the font weight of the heading, affecting its boldness and visual emphasis.',
      control: {
        type: 'select',
        options: ['regular', 'medium', 'semibold', 'bold'],
      },
      table: {
        type: { summary: '"regular" | "medium" | "semibold" | "bold"' },
        defaultValue: { summary: 'regular' },
      },
    },
    children: {
      description: 'The text content to display within the heading element.',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: undefined },
      },
    },
  },
} satisfies Meta<typeof Heading>

// Stories
type Story = StoryObj<typeof Heading>

const weights: Weight[] = ['regular', 'medium', 'semibold', 'bold']

export const Default: Story = {
  args: {
    as: 'h1',
    size: 'md',
    weight: 'regular',
    children: 'Display md Regular',
  },
}

// Stories for docs
export const Display2XL = { tags: ['!dev', '!test'], ...renderHeading('2xl') }
export const DisplayXL = { tags: ['!dev', '!test'], ...renderHeading('xl') }
export const DisplayLG = { tags: ['!dev', '!test'], ...renderHeading('lg') }
export const DisplayMD = { tags: ['!dev', '!test'], ...renderHeading('sm') }
export const DisplaySM = { tags: ['!dev', '!test'], ...renderHeading('sm') }
export const DisplayXS = { tags: ['!dev', '!test'], ...renderHeading('xs') }

function renderHeading(size: DisplaySize): Pick<Story, 'render'> {
  return {
    render: () => (
      <>
        {weights.map((weight) => (
          <Heading key={weight} as={'h1'} size={size} weight={weight}>
            Display {size} {weight}
          </Heading>
        ))}
      </>
    ),
  }
}
