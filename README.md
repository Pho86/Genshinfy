# Genshinfy
<p align="center">
    <img alt="Hu Tao Listening to music" src="/assets/img/hutao-music.gif">
</p>

Genshinfy is a non-commercial music streaming project for personal use. It uses Nuxt 3/Vue, TailwindCSS, TS, Firebase, and Howler JS. Currently hosted on [Vercel](https://genshinfy.vercel.app/).

## To-Do

-   [ ] Allow users to create playlists and share links to other users
-   [ ] Search functionality
-   [ ] Profile Pages for artists/users
-   [ ] Music Queue Page to display current queue
-   [ ] Next/Back buttons to control music queue 
-   [ ] Improve micro interactions
-   [ ] Music Player Settings
-   [ ] Display what current song is playing 
-   [ ] Music thumbnails?

## Nuxt 3

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

will need firebase tokens, read .env.example for examples