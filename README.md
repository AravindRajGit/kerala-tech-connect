# Kerala Tech Connect

Kerala Tech Connect is a modern static directory website for discovering tech speakers, bloggers / vloggers, and communities across Kerala.

## Project Structure

- `index.html` - Landing page
- `speakers.html` - Speakers directory
- `bloggers.html` - Bloggers / vloggers directory
- `communities.html` - Communities directory
- `css/` - Shared styles
- `js/` - Shared data and page rendering logic
- `assets/` - Static assets placeholder

## GitHub Pages Deployment

You can host this project on GitHub Pages because it is a static site.

### Step 1: Create a GitHub repository

Create a new repository on GitHub, for example `kerala-tech-connect`.

### Step 2: Push the project files

Make sure these files are in the repository root:

- `index.html`
- `speakers.html`
- `bloggers.html`
- `communities.html`
- `404.html`
- `css/`
- `js/`
- `assets/`

### Step 3: Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Click **Pages** in the sidebar.
4. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Save the settings.

### Step 4: Open the live site

GitHub will generate a Pages URL after deployment completes. The site will usually be available at a URL like:

`https://<your-username>.github.io/<repository-name>/`

## Notes

- Keep `index.html` in the repository root so it becomes the homepage.
- The design uses Google Fonts and Font Awesome from CDNs, so the site needs internet access for those resources.
- If you later add images, place them in `assets/` and update the image paths accordingly.

