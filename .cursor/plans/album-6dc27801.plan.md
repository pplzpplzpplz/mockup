<!-- 6dc27801-2e6f-4eaf-94ff-d3b27a42021b 2e7f2781-b0b4-4b60-a185-44d7b8c0e91d -->
# Album Art Streaming Mockups – Build Plan (React + JS, CSS Modules)

## Overview

Create a client-only React app where users upload or drop an image, set artist/song/album text, preview in a pixel-accurate Spotify skin (mobile & desktop views in v1), and export a high-res PNG. Structure the UI so adding Apple Music and other services is straightforward later. No backend for v1.

## Tech Stack

- React + Vite (existing project `mockup`)
- JavaScript (no TypeScript)
- CSS Modules for styling
- Libraries: `html-to-image` (PNG export), `clsx` (optional), `react-dropzone` (optional; can DIY)

## Project Structure (under `src/`)

- `src/App.jsx` – root layout and routing (single-screen)
- `src/state/` – simple React Context + reducer for app state
  - `MockupProvider.jsx`, `mockupReducer.js`
- `src/components/`
  - `UploadDropzone.jsx` – drag/drop + file input (mobile friendly)
  - `ControlsPanel.jsx` – inputs for artist, song, album; device view toggles
  - `PreviewStage.jsx` – renders the selected skin inside an exportable frame
  - `ExportBar.jsx` – PNG export button (scale selector x1/x2/x3)
  - `ServiceSwitcher.jsx` – future-proofed service select (Spotify-only enabled)
- `src/skins/`
  - `ServiceFrame.jsx` – common frame (device bezel/padding, background)
  - `spotify/`
    - `SpotifyMobile.jsx`, `SpotifyDesktop.jsx`
    - `spotify.module.css`
  - `registry.js` – map of service + view to components
- `src/utils/`
  - `imageFit.js` – auto pad to square (no crop), EXIF orientation fix (optional)
  - `exportImage.js` – wrapper around `html-to-image` with scaling & cleanup
  - `fonts.js` – font loading helpers & fallbacks
- `src/styles/`
  - `globals.css` – root variables (colors, font stacks) and resets

## State Model (Context)

App state managed via Context + reducer:

- `image`: original File, object URL, processed square DataURL
- `meta`: `{ artistName, songTitle, albumTitle }`
- `service`: `'spotify'`
- `view`: `'mobile' | 'desktop'`
- `theme`: `'dark' | 'light'` (Spotify uses dark; keep for future)
- `exportScale`: `1 | 2 | 3`

## Image Pipeline (No Crop Tool)

- Accept `image/*` via drop or input (use `capture` on mobile input).
- Read as `ImageBitmap`/`HTMLImageElement`.
- Auto-generate a square canvas:
  - If square: draw as-is
  - If not: center on a square canvas and pad using:
    - solid background color (configurable), or
    - blurred stretched background (optional, later)
- Optionally correct orientation via `exifr` (later; skip in v1 if needed)
- Store resulting square DataURL for rendering; keep original for re-process.

## Skins Architecture

- `ServiceFrame` provides a fixed-size art slot and skin surface area; children receive `{ imageUrl, meta, theme }`.
- `registry.js` exports:
```js
export const services = {
  spotify: {
    label: 'Spotify',
    views: {
      mobile: SpotifyMobile,
      desktop: SpotifyDesktop,
    }
  },
  // appleMusic: {...} (later)
};
```

- Each skin component receives props and renders pixel-accurate UI using CSS Modules and font fallbacks.

## Spotify Skin (v1)

- Views: Mobile (iOS-like frame) and Desktop player UI
- Elements: album art square, track title, artist list, album name (optional), playback bar, controls, device chrome (simplified), explicit badge (optional later)
- Fonts: Use a lookalike stack by default (`Inter`, `SF Pro Text`, `system-ui`) and isolate font styles in CSS Modules. Allow custom font URL upload later.

## Export (Client-only)

- `html-to-image` on the `PreviewStage` container; set `pixelRatio = exportScale`.
- Export PNG; auto filename from meta.
- Ensure external fonts are loaded before export (`document.fonts.ready`).

## Styling & Fidelity

- CSS Modules per skin; avoid global leakage.
- Root CSS variables for colors and spacing; allow skin overrides.
- Aim for visual fidelity while avoiding exact proprietary assets (logos/icons recreated as vectors or CSS). Provide a toggle to hide brand marks if desired.

## Accessibility & UX

- Keyboard focus for inputs; live preview updates.
- Dropzone with clear affordances and fallback button.
- Mobile-friendly: large tap targets; file input supports camera capture.

## Future-Proofing

- Apple Music skin: add `appleMusic/` directory and register in `registry.js`.
- Service-specific theming (light/dark) per registry entry.
- Local persistence via `localStorage` for last-used meta and export scale.
- Video/GIF export (later): consider `ffmpeg.wasm` or `whammy` + canvas loop; architect previews to be renderable frame-by-frame.
- Pretty morphs (v2): shared-element transitions when switching view/service using `framer-motion`:
  - Use `layoutId` for the album art, title, artist, and controls to smoothly animate position/size between skins.
  - Crossfade text/typography differences; animate color tokens to avoid hard cuts.
  - Stabilize React keys for shared elements so layout animations link correctly.
  - Support `prefers-reduced-motion` to disable animations for accessibility.
  - Disable animations during PNG export to ensure deterministic renders.

## Dependencies to Add (when implementing)

- `html-to-image`
- Optional: `react-dropzone`, `clsx`, `exifr`

## Acceptance Criteria (v1)

- Upload/drag an image; preview renders in Spotify Mobile and Desktop.
- Edit artist/song/album and see live updates.
- Switch between Mobile/Desktop.
- Export PNG (x1/x2/x3) of preview area with correct fonts and layout.
- No backend; everything works offline after load.

## How to Prompt ChatGPT During Build

- Be explicit about files and minimal edits. Example:
  - “Create `src/state/MockupProvider.jsx` with Context + reducer for image/meta/service/view/exportScale; wire Provider in `src/App.jsx`.”
  - “Implement `src/utils/imageFit.js` function `makeSquareImage(dataUrl, { padColor: '#111' })` that returns a square PNG DataURL.”
  - “Add `src/skins/spotify/SpotifyMobile.jsx` and `spotify.module.css` to render a pixel-accurate mobile player with placeholders.”
  - “Update `src/components/PreviewStage.jsx` to resolve component from `src/skins/registry.js` using `service` and `view`.”
  - “Add `src/components/ExportBar.jsx` that exports PNG via `html-to-image` at selected scale; ensure fonts are ready.”
- Ask for targeted CSS tweaks: “Nudge typography to better match Spotify: title 16px/700, artist 14px/500, tighter letter-spacing.”
- When adding Apple Music later: “Create `src/skins/apple/` with Mobile and Desktop; register in `registry.js`; add light theme tokens; replicate title/artist layout.”

### To-dos

- [ ] Add Context + reducer for app state and wire provider
- [ ] Create drag & drop + file input upload component
- [ ] Implement auto pad-to-square image processing in utils
- [ ] Build Spotify Mobile skin (component + CSS Module)
- [ ] Build Spotify Desktop skin (component + CSS Module)
- [ ] Implement PreviewStage to host skin and frame for export
- [ ] Create ControlsPanel to edit artist/song/album and view
- [ ] Add PNG export bar using html-to-image with scaling
- [ ] Add ServiceSwitcher (Spotify enabled; structure for more)
- [ ] Add globals.css and font fallbacks; align base typography
- [ ] Persist meta/exportScale to localStorage (optional)
- [ ] UX polish, a11y, empty states, error handling