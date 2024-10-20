# Research Papers Website

This project is a React-based web application for browsing and reading research papers. It features a responsive design, dynamic content loading, and a user-friendly interface for exploring academic content.

## Features

- Browse a collection of research papers
- Read papers with a dynamic table of contents
- Search functionality
- Responsive design for mobile and desktop
- Reading progress indicator
- Category filtering

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- React Router
- React Markdown
- Vite (for build and development)

## Project Structure

```
research-papers-website/
├── public/
│   └── papers/
│       └── ai-governance-pathway.md
├── src/
│   ├── components/
│   │   ├── CategorySection.tsx
│   │   ├── Header.tsx
│   │   ├── ReadingProgressBar.tsx
│   │   ├── SearchPopup.tsx
│   │   ├── Sidebar.tsx
│   │   └── TableOfContents.tsx
│   ├── data/
│   │   └── papers.ts
│   ├── hooks/
│   │   └── useMarkdownContent.ts
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   └── PaperPage.tsx
│   ├── utils/
│   │   ├── componentCheck.ts
│   │   └── headingExtractor.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/research-papers-website.git
   ```

2. Navigate to the project directory:
   ```
   cd research-papers-website
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to view the application.

## Building for Production

To build the project for production, run:

```
npm run build
```

This will generate a `dist` folder with the production-ready files.

## Deployment

This project is configured for deployment on Netlify. The `netlify.toml` file in the root directory contains the necessary configuration for building and deploying the application.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.