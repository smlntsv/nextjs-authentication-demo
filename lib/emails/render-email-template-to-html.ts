'use server'

import 'server-only'
import { createElement, FC } from 'react'

async function renderEmailTemplateToHtml<T extends Record<string, unknown>>(
  template: FC<T>,
  props: T
): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server')
  return renderToStaticMarkup(createElement(template, props))
}

export { renderEmailTemplateToHtml }
