If I think it, I build it. This is where I put it.

A personal portfolio - projects, writings, a few stories, and more tabs in the theme picker than any reasonable person needs.

---

There's a Resume button on the page. It strips the portfolio down to a printable CV, opens it in a new tab, and closes itself after five seconds. Best used on desktop - it gets a little unreliable on mobile. Though honestly, this portfolio makes a reasonable résumé on its own. LinkedIn is also there, for the version with endorsements from people I've met twice.

---

## How it's built

Plain [Astro](https://astro.build). No UI framework - just TypeScript, vanilla CSS, and a custom integration that generates the sitemap. Projects are defined in a single TypeScript file; the build figures out the rest. A `/nojs` route exists for the principled visitor who browses without JavaScript. The interesting parts need JavaScript. That's the deal.

## Themes

Three columns in the picker - three kinds of themes:

- **Light.** The default your device comes with. Attracts bugs.
- **Dark.** If you're going to share your screen while I sit in the dark, please use this.
- **Untold.** For the curious. I like curious people - the ones who stick around long enough to find the untold stories.

---

Something on the page responds to persistence. Seven, specifically.
