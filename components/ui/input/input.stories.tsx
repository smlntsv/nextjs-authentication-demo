import { Meta, StoryObj } from '@storybook/react'
import { Input, inputSizeMap } from './input'

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    variantSize: {
      description: 'Size of the input field.',
      control: {
        type: 'select',
        options: Object.keys(inputSizeMap),
      },
      table: {
        type: { summary: Object.keys(inputSizeMap).join(' | ') },
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      description: 'Label for the input field.',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: undefined },
      },
    },
    error: {
      description: 'Error message to display when validation fails.',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: undefined },
      },
    },
    type: {
      description: 'Specifies the type of the input.',
      control: {
        type: 'select',
        options: ['email', 'password', 'text'],
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      description: 'Placeholder of the input field.',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
} satisfies Meta<typeof Input>

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Label',
    type: 'text',
    placeholder: 'Enter something',
    variantSize: 'md',
  },
}

export const EmailInputMD: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    variantSize: 'md',
  },
}

export const EmailInputWithErrorMD: Story = {
  args: {
    ...EmailInputMD.args,
    error: 'Email is required',
  },
}

export const PasswordInputMD: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    variantSize: 'md',
  },
}

export const PasswordInputWithErrorMD: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    error: 'Password must be at least 8 characters',
    variantSize: 'md',
  },
}
