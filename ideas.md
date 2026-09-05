# Ivona Wedding Invitation — Light-Blue Botanical Design Direction

## Ground-Truth Reference

The supplied reference at `https://wedding-invitation-ivona.vercel.app/` remains the structural and experiential specification. The recreation preserves its mobile-first narrow invitation canvas, layered vintage garden imagery, tall arch motif, high-contrast serif/script typographic pairing, long-form editorial scroll, invitation gate, and gentle cinematic motion, while translating floral decoration and color into a light-blue botanical interpretation.

## Chosen Design Philosophy: Light-Blue Botanical Heirloom

### Design Movement

The experience follows an **editorial botanical heirloom invitation** aesthetic. It borrows from antique hand-tinted garden illustrations, chapel-stationery arches, layered printed paper, and restrained wedding-film title cards rather than modern card-based web UI.

### Core Principles

1. **Reference fidelity first.** The composition must preserve the visual cadence of the original: the invitation gate, botanical chapter breaks, portrait moments, details, gallery, RSVP, love story, final countdown, and closing blessing.
2. **Atmosphere through layers.** Forest depth, flower clusters, translucent paper, decorative frames, and soft overlays create a visual experience that feels assembled from keepsake stationery.
3. **Mobile invitation scale.** The primary experience is a tall, narrow canvas. On wider screens, the artwork remains centered and protected by quiet neutral side space.
4. **Motion as ceremony.** Reveals must feel gentle and intentional: floral drift, quiet fades, lifting frames, and slow parallax, never app-like or abrupt.

### Color Philosophy

Powder blue and silver-blue establish an airy, serene tenderness, while porcelain white protects legibility and creates a paper-like base. Deep slate blue provides ceremony and readable contrast, while sage-blue leaves make the floral work feel natural rather than icy. The ownable accent is **Heirloom Slate Blue (`#5E7F9F`)**, used for arch strokes, high-value names, borders, and quiet interactive emphasis.

### Layout Paradigm

The site behaves as a **vertical invitation film** rather than a multi-column marketing page. An introductory cover opens into a continuous sequence of full-bleed botanical scenes, material-like parchment panels, and alternating image/text chapters. It should not use a dashboard grid or floating navigation.

### Signature Elements

- A tall double-line chapel arch that frames the cover and selected editorial chapters.
- Botanical clusters rising from the lower edge or wrapping a corner, with no repeated generic stock shapes.
- Thin rule ornaments and soft translucent parchment cards carrying information inside the garden scenes.

### Interaction Philosophy

The invitation is discovered, not operated. The opening action begins the story; a discreet music control follows the user; event, calendar, gallery, and attendance actions feel like part of the printed invitation. All controls remain accessible, responsive, and unambiguous.

### Animation

The gate leaves through a 650–850 ms opacity and scale transition, revealing the invitation beneath. Major sections fade and rise from `translateY(24px)` as they enter the viewport. Decorative blooms use barely perceptible drift, while artwork may use a slow parallax shift. All nonessential motion must respect `prefers-reduced-motion`; interactive controls keep their feedback under 180 ms.

### Typography System

Use **Cormorant Garamond** for couple names, large section headings, dates, and the ampersand; use **DM Sans** for small labels, addresses, and controls; reserve a restrained **Parisienne** accent only for an occasional handwritten line. Names have generous letter spacing, supporting detail text is compact, and the hierarchy should mirror engraved stationery rather than a SaaS interface.

### Brand Essence

**A cinematic botanical wedding invitation for couples who want their day to arrive as a keepsake, not a notification.**

Personality: **romantic, heirloom, composed**.

### Brand Voice

Headlines are warm, timeless, and declarative; calls to action are courteous and specific; microcopy is calm and intimate. Avoid generic welcome language and sales-oriented phrasing.

Examples: “With grateful hearts, we invite you to share our first day as husband and wife.” and “Open the invitation and step into our garden of promises.”

### Wordmark and Logo

Create a single monogram-like **interlocked J & M botanical mark**—a deep slate-blue circular crest with a small powder-blue leaf sprig. It is symbolic, text-free, and legible at favicon and header sizes.

## Implementation Guardrails

- Use distinct floral and scene art for prominent chapters; never repeat the same image to fill unrelated sections.
- Keep all text on light/translucent parchment or a sufficiently darkened image treatment for contrast.
- Match the supplied reference's vertical rhythm, decoration density, and quiet, immersive pacing.
- The static RSVP behaves as a polished on-page confirmation interaction; persistence or guest-message storage requires a future server upgrade.

## Style Decisions

- The first visible composition is always a double-line chapel arch, botanical framing, couple-name hierarchy, date, and ceremonial invitation-opening cue.
- Antique cream protects the desktop side space, while the central mobile canvas always remains visibly structured with heirloom stationery, garden artwork, or editorial content.
- Heirloom Slate Blue (`#5E7F9F`) remains the exclusive signature accent for arches, crest details, names, rules, borders, and primary invitation actions.
