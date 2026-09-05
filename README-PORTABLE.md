# Groom & Bride Wedding Invitation — Portable VS Code Package

This copy is prepared for local use in Visual Studio Code. All **17 required media assets** are already included in `client/public/assets`, including the scenic backgrounds, floral sprays, ornaments, monogram, blank-image placeholder, and LoveStory background music.

The included `.env.local` automatically sets `VITE_INVITATION_ASSET_BASE=/assets`, so no manual environment-variable setup is required. The invitation will use the bundled local files instead of the managed storage URLs when run locally.

## Run in VS Code

Open this folder in VS Code, open the integrated terminal, and run:

```bash
pnpm install
pnpm dev
```

Then open the local URL printed by Vite, normally `http://localhost:3000/`.

If `pnpm` is not installed, install Node.js LTS first and then enable pnpm with `corepack enable`. Do not delete `client/public/assets` because the invitation’s local images and audio are stored there.

## Included media

The bundle includes the fountain garden, forest path, gazebo garden, lakeside bridge, sundial garden, garden gate, hydrangea gallery, stone balustrade, soundtrack artwork, LoveStory audio, blank-image placeholder, closing blooms, monogram, corner spray, lower flourish, trailing vine, and engraved ornament.

## Local behavior

Clicking **Open Invitation** starts the cinematic reveal and begins the background music at the configured 0:26 offset, subject to the browser’s normal audio policy. The invitation remains mobile-first and preserves the blue botanical opening, parallax, and floral curtain choreography.
