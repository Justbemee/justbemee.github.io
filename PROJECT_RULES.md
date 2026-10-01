Folder structure
- Root files:
  - index.html — home page
  - about.html, all-paintings.html, consulting.html, contact.html, gallery.html — active site pages
  - thoughts.html — temporarily hidden; preserve content and keep unlinked until explicitly restored
  - style.css — main stylesheet
  - theme.js — dark mode / theme logic
  - README.md — project note
  - CNAME — GitHub Pages custom domain config
- Asset folder:
  - images — contains all artwork images and the favicon image references

### 2. Which files control layout
- index.html is the main layout-heavy page: it defines the home grid, navigation tiles, and quote section.
- gallery.html defines the portfolio layout and gallery grid.
- Other HTML pages (about.html, contact.html, thoughts.html, consulting.html) define their page-specific structure with HTML sections, nav, and footer.
- style.css defines the layout rules for:
  - page navigation bar
  - `.home-layout`, `.home-list`, `.quote-section`
  - `.item`, `.gallery`, `.hero-image`
  - general spacing and responsive behavior
- Inline `style` blocks and `style` attributes in the HTML also affect page layout on a per-page basis.

### 3. Which files control styling
- style.css is the main styling file.
- theme.js controls theme classes and dark mode behavior, while style.css defines the actual color variables and dark-mode styles.
- Several pages add page-specific styling directly in HTML:
  - gallery.html has inline `<style>` for smooth scrolling and gallery behavior
  - thoughts.html has inline `<style>` for quote cards
  - index.html and other pages use inline `style="..."` attributes for banners, hero images, buttons, etc.

### 4. Where images are stored
- All images are stored in the images folder.
- The folder contains many `.webp` files used throughout the site.
- Page content references images with paths like Memory.webp, Love.webp, and so on.

### 5. Which files you should avoid editing
- theme.js — avoid changing this unless you want to modify dark-mode/theme behavior.
- CNAME — keep this if you are using the current custom GitHub Pages domain.
- images — avoid renaming or moving files unless you also update all HTML references, because filenames are used directly in the pages.
- style.css — you can edit it for styling, but because it is the shared stylesheet, changes affect the whole site. If you only want page-specific content updates, edit HTML pages instead.

### 6. How new pages should be added
- Create a new `.html` file in the root, e.g. `newpage.html`.
- Copy the structure from an existing page:
  - `<link rel="stylesheet" href="style.css">`
  - `<nav>` with a home link
  - page content
  - `<script src="theme.js"></script>` before `</body>` for dark mode
- Add the new page link to navigation or homepage tiles where needed:
  - in index.html, add a new `<a href="newpage.html" class="item">...`
  - or add a link in gallery.html / other pages if appropriate
- If the page needs images, place them in images and reference them with relative paths like `images/your-image.webp`.

### 7. Homepage painting previews
- Keep homepage painting previews' visible edges consistently rounded; use the existing 18px radius as the reference.
- The Time painting's zoom, proportions, horizontal framing, and crop are intentional. When adjusting its gap, change only its vertical position so the faces remain framed as intended.
- Keep painting edge and spacing changes scoped to the homepage unless a broader change is explicitly requested.

### 8. Site maintenance checks
- Treat `all-paintings.html` as the canonical source for painting metadata and image paths; update dependent Portfolio entries when those records change.
- Keep `style.css` valid CSS with no prose or labels outside comments.
- Test the homepage at approximately 390px wide after layout changes; the mobile view must stack the navigation and slideshow instead of allowing the fixed desktop sidebar to push the slideshow offscreen.
- When adding or renaming an image, verify the exact case, spaces, punctuation, and extension against the filename in `images/`.
- Keep page-specific text, form, and control colors theme-aware; avoid hard-coded light-mode colors that reduce contrast in dark themes.

### 9. Temporarily hidden pages
- `thoughts.html` is intentionally hidden as of 2026-10-01. Keep it out of homepage navigation and redirect direct visits to `index.html` until the user explicitly asks to restore it.

### 10. Mobile homepage theme control
- On phone widths, the homepage dark toggle uses only the Cool theme and must not show the theme chooser, countdown, jokes, or top banner.
- Store the mobile homepage theme preference separately from the desktop theme preference; keep desktop theme behavior unchanged.
