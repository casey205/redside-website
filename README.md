# Redside Surveying & Mapping — Website

Professional website for Redside Surveying & Mapping, a geospatial consulting practice based in the Pacific Northwest.

## Structure

```
/
├── index.html              # Home page
├── portfolio.html          # Projects overview
├── project-trail.html      # Trail Corridor Visualization project
├── project-watershed.html  # Watershed Restoration project
├── project-building.html   # Complex Building Model project
├── services.html           # Services + MTB Design Tools
├── about.html              # About page
├── contact.html            # Contact form
├── css/
│   └── style.css           # All styles
└── js/
    └── main.js             # Navigation, scroll behavior, form handling
```

## Adding NIRA Viewers

Use the asset URL from **Share → Visibility** (not the browser URL with `/1` view index unless you intend that view).

```html
<div class="viewer-iframe-container viewer-iframe-container--hero">
  <iframe
    frameborder="0"
    style="background:black"
    allowfullscreen
    allow="fullscreen"
    src="https://redsidemapping.nira.app/a/YOUR_ASSET_ID"
    title="Project Name 3D Model | Redside Surveying & Mapping">
  </iframe>
</div>
```

**Seamless auto-start:** On most Nira plans, embeds show a preview screen with a play button before the model loads. Skipping that requires Nira Enterprise **Skip Asset Preview** ([Nira help article](https://help.nira.app/hc/en-us/articles/26550764700443-Is-it-possible-to-skip-the-preview-page-and-auto-start-a-Nira)). Contact Nira support if you want that on your account.

**Home and portfolio:** Project cards use embedded NIRA iframes. Full-height viewers are on each project page (`#viewer`).

### NIRA works locally but not on GitHub Pages

1. **Use the live site URL**, not the GitHub file browser. Embeds only run on Pages, for example `https://casey205.github.io/redside-website/project-trail.html`, not when previewing HTML on github.com.

2. **Hard refresh** after pushing (`Ctrl+Shift+R`). An older build used link teasers instead of iframes.

3. **Asset visibility in NIRA:** For public visitors, each asset must be **Publicly Accessible** (Share → Visibility). Private assets can look fine on your machine when you are logged into NIRA but fail for everyone else on GitHub Pages.

4. **Click play inside the black viewer.** On Professional plans, NIRA shows a preview overlay before the model loads. That is normal; it is not a broken embed.

5. **Confirm the pushed HTML:** View Page Source on the live URL and search for `redsidemapping.nira.app`. You should see `<iframe` tags, not only `project-card__visual--link`.

6. **Professional plan:** iframe embedding requires NIRA Professional or higher ([NIRA embedding docs](https://help.nira.app/hc/en-us/articles/13521837109275-Embedding-a-Nira-asset-with-iframe)).

## Home Page Intro Video (~20 seconds)

In `index.html`, inside the hero (`.hero__video`), replace the placeholder with:

```html
<div class="viewer-iframe-container hero__video-player">
  <iframe
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0"
    title="What Redside Surveying & Mapping delivers"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>
```

Caption under the player: **MTB Design Tools → CalTopo → NIRA**.

## Adding YouTube Videos

Each project page has a video placeholder section. Replace the placeholder div with:

```html
<div class="viewer-iframe-container">
  <iframe 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
    allowfullscreen
    title="Video title">
  </iframe>
</div>
```

## Contact Form

The contact form currently shows a success message on submit (client-side only). To make it actually send email, connect it to one of these free services:

- **[Formspree](https://formspree.io)** — add `action="https://formspree.io/f/YOUR_ID"` and `method="POST"` to the `<form>` tag
- **[Netlify Forms](https://docs.netlify.com/forms/setup/)** — add `data-netlify="true"` if deploying to Netlify
- **[EmailJS](https://emailjs.com)** — JavaScript-based, no server needed

## Adding Your Email Address

Contact email on the site: `casey@redsidemapping.com` (see `contact.html`).

## Deployment

This is a plain HTML/CSS/JS site — no build step required. It can be deployed to:

- **GitHub Pages** (free) — push to a `gh-pages` branch or configure in repo settings
- **Netlify** (free) — drag and drop the folder at netlify.com
- **Any web host** — upload files via FTP

## Git Workflow (Desktop ↔ Laptop)

```bash
# Before starting work on any machine:
git pull

# After finishing work:
git add .
git commit -m "describe what you changed"
git push
```
