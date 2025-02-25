import type { Meta, StoryObj } from '@storybook/react'
import type { DisplaySize } from '@/components/ui/typography/typography-shared'
import { typographyWeights } from '@/components/ui/typography/typography-shared'
import { Heading } from '@/components/ui/typography/heading'
import {
  allowedHeadingElements,
  headingSizeMap,
  headingWeightMap,
} from '@/components/ui/typography/heading/heading'

// Meta
export default {
  title: 'UI/Typography/Heading',
  component: Heading,
  argTypes: {
    as: {
      description: 'Specifies the HTML heading element to render, controlling semantic structure.',
      control: {
        type: 'select',
        options: allowedHeadingElements,
      },
      table: {
        type: { summary: allowedHeadingElements.join(' | ') },
        defaultValue: { summary: allowedHeadingElements[0] },
      },
    },
    size: {
      description:
        'Sets the visual size of the heading, independent of the HTML element, for consistent typography scaling.',
      control: {
        type: 'select',
        options: Object.keys(headingSizeMap),
      },
      table: {
        type: { summary: Object.keys(headingSizeMap).join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    weight: {
      description:
        'Controls the font weight of the heading, affecting its boldness and visual emphasis.',
      control: {
        type: 'select',
        options: Object.keys(headingWeightMap),
      },
      table: {
        type: { summary: Object.keys(headingWeightMap).join(' | ') },
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
        {typographyWeights.map((weight) => (
          <Heading key={weight} as={'h1'} size={size} weight={weight}>
            Display {size} {weight}
          </Heading>
        ))}
      </>
    ),
  }
}
