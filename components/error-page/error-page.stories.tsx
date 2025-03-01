import type { Meta, StoryObj } from '@storybook/react'
import { ErrorPage } from '@/components/error-page'
import { Button } from '@/components/ui/button'
import { defaultErrorPageProps } from '@/app/error'
import { notFoundErrorPageProps } from '@/app/not-found'

export default {
  title: 'Error Page',
  component: ErrorPage,
  argTypes: {
    subheading: {
      description: 'A subheading text that provides short error description.',
      control: {
        type: 'text',
      },
    },
    heading: {
      description: 'The main heading text that describes the error.',
      control: {
        type: 'text',
      },
    },
    description: {
      description: 'A detailed description of the error providing more information to the user.',
    },
    renderActionButtons: {
      description: 'Render action buttons for user interaction.',
    },
  },
} satisfies Meta<typeof ErrorPage>

type Story = StoryObj<typeof ErrorPage>

export const Default: Story = {
  args: {
    subheading: 'Subheading',
    heading: 'Error Title',
    description: 'Error description',
    renderActionButtons: () => (
      <>
        <Button size={'xl'}>Action</Button>
        <Button size={'xl'} variant={'secondaryGray'}>
          Other Action
        </Button>
      </>
    ),
  },
}

export const NotFound: Story = {
  args: {
    ...notFoundErrorPageProps,
    renderActionButtons: () => (
      <>
        <Button size={'xl'}>Take me home</Button>
        <Button size={'xl'} variant={'secondaryGray'}>
          Go Back
        </Button>
      </>
    ),
  },
}
export const UncaughtError: Story = {
  args: {
    ...defaultErrorPageProps,
    renderActionButtons: () => (
      <>
        <Button size={'xl'}>Try Again</Button>
        <Button variant={'secondaryGray'} size={'xl'}>
          Take me home
        </Button>
      </>
    ),
  },
}
