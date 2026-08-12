# Design QA — KBJZR Rework 2026

## Comparison target

- Source visual truth: `/Users/jakubjeziorny/Documents/Codex/2026-08-12/prior-conversation-with-codex-conversation-role/work/playwright/reference/.playwright-cli/page-2026-08-12T08-02-32-021Z.png` (macwright.com home page).
- Final home implementation: `/Users/jakubjeziorny/Documents/Codex/2026-08-12/prior-conversation-with-codex-conversation-role/.playwright-cli/page-2026-08-12T08-18-55-539Z.png`.
- Final post implementation: `/Users/jakubjeziorny/Documents/Codex/2026-08-12/prior-conversation-with-codex-conversation-role/.playwright-cli/page-2026-08-12T08-19-20-935Z.png`.
- Final mobile home implementation: `/Users/jakubjeziorny/Documents/Codex/2026-08-12/prior-conversation-with-codex-conversation-role/work/playwright/rework-mobile/.playwright-cli/page-2026-08-12T08-19-54-151Z.png`.
- Full-view comparison evidence: `/Users/jakubjeziorny/Documents/Codex/2026-08-12/prior-conversation-with-codex-conversation-role/work/playwright/comparison/home-reference-vs-rework-final.png` (reference on the left, implementation on the right).
- Alignment source: `/var/folders/yf/8fnbl_d93037r_tszckjtqm00000gn/T/TemporaryItems/NSIRD_screencaptureui_y6Ojnu/Zrzut ekranu 2026-08-12 o 13.25.39.png`.
- Alignment implementation: `/Users/jakubjeziorny/Documents/Codex/2026-08-12/prior-conversation-with-codex-conversation-role/work/playwright/comparison/.playwright-cli/page-2026-08-12T11-28-27-387Z.png`.

The source is a home-page reference, so the post was checked for the same visual system rather than identical content or information architecture. The profile note and the blog-only list are intentional additions required by the brief.

## Capture normalization

- Desktop source and implementation: `1200 × 1279` pixels, CSS viewport `1200 × 1279`, device scale factor `1`, light theme, top-of-page state.
- Mobile implementation: `390 × 844` pixels, CSS viewport `390 × 844`, device scale factor `1`, light theme, top-of-page state.
- Focused article region: desktop top-of-page capture at `1200 × 1279`; it checks the headline, metadata, text measure and reading rhythm. A separate focused crop was not needed because these details are fully readable in the capture.
- Author-note alignment: source `2560 × 1440` pixels (browser chrome excluded from the visual judgement) and implementation `2048 × 1080` pixels at CSS viewport `2048 × 1080`, light theme, top-of-page state. The focused comparison checks the home header row: the author-note rule now shares the row origin with the `Wpisy` heading. Browser console: 0 errors.

## Findings

No actionable P0, P1 or P2 findings remain.

### Required fidelity surfaces

- **Fonts and typography:** The implementation uses a compact system sans-serif stack, strong 18px section labels and right-aligned monospaced dates. The article increases only the headline and long-form measure, preserving the reference’s clear typographic hierarchy without a display font or ornamental type.
- **Spacing and layout rhythm:** Desktop navigation sits at the same left offset as the reference; the writing column starts on the same vertical rhythm. List items use whitespace rather than card surfaces. On mobile the profile note moves above the list so the required personal context remains visible without a sidebar.
- **Colors and visual tokens:** A near-white base, near-black text and low-contrast grey metadata create the restrained light appearance of the reference. The optional dark mode retains those relative contrast levels.
- **Image quality and asset fidelity:** The selected reference’s writing section contains no required imagery or custom icon assets. The rework introduces no placeholder imagery, inline SVG artwork or decorative CSS art.
- **Copy and content:** The post list remains the primary home content; the new descriptive line and profile note are concise Polish copy consistent with the blog. Newsletter UI is absent from the home route while the ConvertKit form remains available in `BlogHeader` via `showNewsletter`.
- **Interactions and accessibility:** Blog, post and back-to-list navigation work; the light/dark/auto controls are labelled buttons with pressed states; visible focus states are included; the 390px layout keeps links, dates and reading text within the viewport. No browser console errors occurred. The only two console warnings are React Router v7 migration notices from the dependency.

## Comparison history

1. **Initial comparison — P2 layout drift.** The first home implementation centred its large frame and separated every row with a rule, which read more like a product table than the reference’s loose text list. The large-screen frame was aligned to the reference’s left rail and list rules were removed.
2. **Second comparison — P2 control collision.** The required profile note shared the top line with the theme controls. The note was moved down on wide screens, preserving the compact profile while leaving the controls unobstructed.
3. **Final comparison.** The paired home capture, final article capture and 390px home capture show no clipping, overlap or remaining P0/P1/P2 visual mismatch against the chosen design direction.
4. **Author-note alignment — P2 fixed.** The wide-screen `margin-top: 42px` on `.author-note` placed the profile block below the home header row. Removing that override aligns its top rule with `Wpisy`; the 10px internal gap remains as intentional card spacing. The latest desktop capture shows no overlap or clipping.

## Implementation checklist

- [x] Replace the neobrutalist shell with a minimal, text-led layout.
- [x] Keep the blog list and a short author note on the home route.
- [x] Hide the newsletter from the home route without deleting ConvertKit behaviour.
- [x] Rework the post reading view in the same visual language.
- [x] Verify desktop and mobile rendering, navigation, theme controls and console errors.

## Follow-up polish

- [P3] If a later iteration adds article imagery, choose editorial imagery sparingly so the reading view retains this intentionally quiet, text-first character.

final result: passed
