import type { Preview } from '@storybook/react'
import '@/app/globals.css'

type BackgroundValue = { name: string; value: string }

const backgroundValues: BackgroundValue[] = [
  { name: 'Light', value: '#ffffff' },
  { name: 'Dark', value: '#0C0E12' },
]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: backgroundValues,
      default: backgroundValues[0].name,
    },
  },
  decorators: [
    (story, context) => {
      const defaultBackgroundColor = backgroundValues[0].value
      const currentBackgroundColor = context.globals.backgrounds?.value ?? defaultBackgroundColor

      if (
        !context.globals.backgrounds ||
        context.globals.backgrounds.value === defaultBackgroundColor
      ) {
        document.documentElement.style.setProperty('color-scheme', 'light')
        document.documentElement.setAttribute('data-theme', 'light')
      } else {
        document.documentElement.style.setProperty('color-scheme', 'dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      }

      // Fix for https://github.com/storybookjs/storybook/issues/13323
      if (context.viewMode === 'docs') {
        let currentElement = context.canvasElement
        let withinCanvas = false
        let sbStoryElement: HTMLElement | null = null

        while (currentElement.tagName !== 'BODY' && currentElement?.parentElement) {
          // Canvas
          if (currentElement.classList.contains('docs-story')) {
            currentElement.style.background = currentBackgroundColor
            withinCanvas = true
          }

          // Story
          if (currentElement.classList.contains('sb-story')) {
            sbStoryElement = currentElement
          }

          currentElement = currentElement.parentElement
        }

        // Apply padding only if Story used without Canvas
        if (sbStoryElement && !withinCanvas) {
          sbStoryElement.style.background = currentBackgroundColor
          sbStoryElement.style.padding = '20px 30px'
        }

        return story()
      }

      return story()
    },
  ],
}

export default preview
