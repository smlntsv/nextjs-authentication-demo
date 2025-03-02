import { Meta, StoryObj } from '@storybook/react'
import { ThemeSwitcher } from '@/components/theming/theme-switcher'
import { ThemeProvider } from '@/components/theming/theme-provider'
import { Container } from '@/components/ui/container'

export default {
  title: 'Theme Switcher',
  component: ThemeSwitcher,
} satisfies Meta<typeof ThemeSwitcher>

type Story = StoryObj<typeof ThemeSwitcher>

export const Default: Story = {
  render: () => (
    <Container centered style={{ background: 'var(--color-background)' }}>
      <ThemeProvider>
        <ThemeSwitcher />
      </ThemeProvider>
    </Container>
  ),
}
