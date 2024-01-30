import type { Config } from "tailwindcss"

import { withTV } from "tailwind-variants/transformer"

// eslint-disable-next-line no-restricted-imports
import { contentVisibilityPlugin, pseudoPlugin } from "./plugins/tailwind"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [contentVisibilityPlugin, pseudoPlugin],
  theme: {
    extend: {},
  },
}

// this is needed for use responsive variants
export default withTV(config)
