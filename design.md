# Design: Techisar

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: Map / Diagram
- Theme: Console
- Axes: dark/grotesk-sans/chromatic-amber, posture: restrained
- Colourways: graphite (dark, the default) and paper (light), switched by the nav toggle through `data-theme`

## Tokens
`app/tokens.css` is the source of truth; `app/base.css` holds the Floor's base rules. Faces load through `next/font` in `app/layout.tsx`:
- Display and body: Host Grotesk, heads at 500, sentence case
- Measured: Atkinson Hyperlegible Mono, only for values, weeks and figures
- The name is always written "Techisar", with a capital T

## Colour meaning
- Amber: the primary action, the current step, the logo mark
- Cool blue: data and measured values, charts, schedules
- Green and red: status only

## Surfaces
- Hairline panels with a 10px radius, 6px on controls; panels that touch share one surface with 1px seams
- Three steps of ground, no shadows, glows, gradients or blur

## Controls
- One amber primary per screen beside 1px outlined secondaries, 48px
- Links underline and turn amber on hover

## Motion
- Owner asked for rich motion, so it goes past the theme's still default, within the Floor
- Lines draw once, `[data-reveal]` rises 8px once, under `.js` so nothing hides without script
- The week bar fills with scroll; the hero signals are the only loop, with a Pause button
- `transform` and `opacity` only, no bounce, every entrance at rest under reduced motion

## Page rules
- No labels above headings, no tracked capitals, no middle-dot strings, no drawn browser or phone frames
- Pages share theme, type and accent and differ only in shape
- Screens of products are drawn as hairline panels inside a `data-slot`, ready for real screenshots

## Exports
None yet. Say "export the tokens" for another format.
