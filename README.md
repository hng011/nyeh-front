# nyeh-front

Personal portfolio website for **Hans Naufal Granito** — AI/ML Engineer & Software Developer. Showcases work experience, projects, skills, and contact information.

Built with [Astro](https://astro.build), [Vue 3](https://vuejs.org), and [Tailwind CSS](https://tailwindcss.com). Deployed via GitHub Pages at [hng011.github.io/nyeh-front](https://hng011.github.io/nyeh-front).

## 🚀 Project Structure

```text
/
├── public/
│   ├── favicon.ico
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Contact.vue
│   │   ├── Experience.vue
│   │   ├── Hero.vue
│   │   ├── Projects.vue
│   │   └── Skills.vue
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── data.ts
│       └── types.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🔧 Getting Started

### Prerequisites

- **Node.js** >= 22.12.0
- **Yarn** package manager

### Setup Locally

```sh
# Clone the repository
git clone https://github.com/hng011/nyeh-front.git
cd nyeh-front

# Install dependencies
yarn install

# Start the development server
yarn dev
```

The dev server runs at `http://localhost:4321`.

### Commands

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `yarn install`    | Install dependencies                             |
| `yarn dev`        | Start local dev server at `localhost:4321`       |
| `yarn build`      | Build production site to `./dist/`               |
| `yarn preview`    | Preview the production build locally             |
| `yarn astro ...`  | Run CLI commands like `astro add`, `astro check` |

### Deployment

The site is deployed to GitHub Pages via the `/.github/workflows` pipeline. Pushing to `main` triggers a build and deploy automatically. The live site is served at:

```
https://hng011.github.io/nyeh-front
```

## 🛠 Tech Stack

- **Framework**: [Astro](https://astro.build)
- **UI Library**: [Vue 3](https://vuejs.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Language**: TypeScript
- **Hosting**: GitHub Pages
