# Ume Choudhary — Fixed Self-Contained Portfolio

This build fixes the broken-image problem by embedding all website imagery, CSS and JavaScript directly inside `index.html`.

## Upload only these files to GitHub root
- index.html
- Ume_Choudhary_Resume.pdf

Optional: README.md

## Replace old build
1. In your GitHub repository, delete or leave the old `assets` folder — the new page does not depend on it.
2. Upload/replace `index.html`.
3. Upload/replace `Ume_Choudhary_Resume.pdf`.
4. Commit changes.
5. Vercel will deploy automatically.
6. Wait for `Ready`, then hard-refresh with Ctrl+F5.

All images are embedded directly in the HTML, so you should not see broken image icons even if the old assets folder is missing.
