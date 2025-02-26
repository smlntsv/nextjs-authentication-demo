import type { Meta, StoryObj } from '@storybook/react'
import {
  Button,
  ButtonSize,
  buttonSizeMap,
  ButtonVariant,
  buttonVariantMap,
} from '@/components/ui/button'

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    leadingIcon: {
      description: 'Leading icon',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: undefined },
      },
    },
    loading: {
      description: 'Loading state',
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'true | false' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      description: 'Button variant',
      control: {
        type: 'select',
      },
      table: {
        type: { summary: Object.keys(buttonVariantMap).join(' | ') },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Button size',
      control: {
        type: 'select',
      },
      table: {
        type: { summary: Object.keys(buttonSizeMap).join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      description: 'The text content to display within the button element',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: undefined },
      },
    },
  },
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const DefaultButton: Story = {
  args: {
    children: 'Button',
  },
}

export const ButtonLoading: Story = {
  tags: ['!dev', '!test'],
  args: {
    children: 'Loading',
    loading: true,
  },
}

export const ButtonLeadingIcon: Story = {
  tags: ['!dev', '!test'],
  args: {
    children: 'Launch it',
    leadingIcon: <span>🚀</span>,
  },
}

// Stories for docs
export const BasicButtons = { tags: ['!dev', '!test'], ...renderButtons('md') }
export const DisabledButtons = { tags: ['!dev', '!test'], ...renderButtons('md', true) }
export const LoadingButtons = { tags: ['!dev', '!test'], ...renderButtons('md', true, true) }
export const LeadingIconButtons = {
  tags: ['!dev', '!test'],
  ...renderButtons('md', true, false, true),
}
export const Button2XL = { tags: ['!dev', '!test'], ...renderButtons('2xl') }
export const ButtonXL = { tags: ['!dev', '!test'], ...renderButtons('xl') }
export const ButtonLG = { tags: ['!dev', '!test'], ...renderButtons('lg') }
export const ButtonMD = { tags: ['!dev', '!test'], ...renderButtons('md') }
export const ButtonSM = { tags: ['!dev', '!test'], ...renderButtons('sm') }

function renderButtons(
  size: ButtonSize,
  disabled: boolean = false,
  loading: boolean = false,
  leadingIcon: boolean = false
): Pick<Story, 'render'> {
  return {
    render: () => (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {(Object.keys(buttonVariantMap) as ButtonVariant[]).map((variant) => (
          <Button
            key={variant}
            variant={variant}
            size={size}
            disabled={disabled}
            loading={loading}
            leadingIcon={leadingIcon && <span>🚀</span>}
          >
            {variant}
          </Button>
        ))}
      </div>
    ),
  }
}
