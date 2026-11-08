# Techisar design system: Black, red & silver

Chosen by the owner after rejecting the plain Blueprint and Console looks. The site should feel rich, colourful and premium, never text on flat panels.

- **Colour:** black ground, white text, red (`--red`) as the one accent, silver greys (`--silver`, `--steel`, `--mist`, `--ash`) in support. No other hues; green is only for the small Live status. Primary buttons are red with white text in both themes (`--grad-btn`, `--on-btn`). Values live in `app/tokens.css`.
- **Type:** Bricolage Grotesque for headings, Plus Jakarta Sans for text, JetBrains Mono for code and tags, Caveat for handwritten notes.
- **Background:** the `.sky` layer in `app/layout.tsx` runs behind every page. Sections add `.glow` blobs.
- **Doodles:** use `<Doodle>` from `app/components/doodle.tsx`. They draw themselves on scroll. Every section should have at least one.
- **Cards:** glass surfaces, 24 to 36px corners, at least 26px padding on phones and 36px on desktop. Add `.spot` for the cursor light.
- **Spacing:** sections use `--section` (128px on desktop), section heads use `--head-gap`. Do not go tighter.
- **Motion:** use `data-reveal` inside `<Reveal>` for entrances. Hover lifts use the `translate` property so they do not fight the entrance animation. Every loop must stop under reduced motion.
- **Brand:** always "Techisar" with a capital T. Do not bring back the "NEW" badge.
