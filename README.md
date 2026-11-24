# Omar Elazouni — Portfolio

Static site: `index.html`, `css/`, `js/`, `assets/`. No build step.

## Preview locally
```
python -m http.server 5510
```
then open http://localhost:5510

## Publish on GitHub Pages
1. Create a public repo named `OmarElazouni.github.io`.
2. Upload the contents of this folder (not the `.claude` folder) to the repo root.
3. Repo → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
4. The site is live at https://omarelazouni.github.io within a minute or two.

## Editing
- Featured case studies (text, metrics, screenshot lists): `js/projects.js`
- Everything else: `index.html`
- Screenshots: `assets/img/<project>/*.webp` (a listed image that is missing is hidden automatically)
- After changing CSS/JS, bump the `?v=` number in `index.html` so browsers reload it.
