import type { Meta, StoryObj } from '@storybook/react'
import { allowedTextElements, Text, textSizeMap, textWeightMap } from './text'
import { TextSize, typographyWeights } from '@/components/ui/typography/typography-shared'

// Meta
export default {
  title: 'UI/Typography/Text',
  component: Text,
  argTypes: {
    as: {
      description: 'Specifies the HTML text element to render, controlling semantic structure.',
      control: {
        type: 'select',
        options: allowedTextElements,
      },
      table: {
        type: { summary: allowedTextElements.join(' | ') },
        defaultValue: { summary: allowedTextElements[0] as string },
      },
    },
    size: {
      description:
        'Sets the visual size of the text, independent of the HTML element, for consistent typography scaling.',
      control: {
        type: 'select',
        options: Object.keys(textSizeMap),
      },
      table: {
        type: { summary: Object.keys(textSizeMap).join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    weight: {
      description:
        'Controls the font weight of the text, affecting its boldness and visual emphasis.',
      control: {
        type: 'select',
        options: Object.keys(textWeightMap),
      },
      table: {
        type: { summary: Object.keys(textWeightMap).join(' | ') },
        defaultValue: { summary: 'regular' },
      },
    },
    children: {
      description: 'The text content to display within the text element.',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: undefined },
      },
    },
  },
} satisfies Meta<typeof Text>

// Stories
type Story = StoryObj<typeof Text>

export const Default: Story = {
  args: {
    as: 'p',
    size: 'md',
    weight: 'regular',
    children: 'Text md Regular',
  },
}

// Stories for docs
export const TextXL = { tags: ['!dev', '!test'], ...renderText('xl') }
export const TextLG = { tags: ['!dev', '!test'], ...renderText('lg') }
export const TextMD = { tags: ['!dev', '!test'], ...renderText('sm') }
export const TextSM = { tags: ['!dev', '!test'], ...renderText('sm') }
export const TextXS = { tags: ['!dev', '!test'], ...renderText('xs') }

function renderText(size: TextSize): Pick<Story, 'render'> {
  return {
    render: () => (
      <>
        {typographyWeights.map((weight) => (
          <Text key={weight} as={'p'} size={size} weight={weight}>
            Text {size} {weight}
          </Text>
        ))}
      </>
    ),
  }
}
