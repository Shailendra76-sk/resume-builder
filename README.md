# ResumePro

A simple, professional resume builder built with Next.js and Tailwind CSS. Create a resume from an easy form, preview it live, and download it as a PDF.

## Features

- Guided form for personal details, summary, work experience, and skills
- Live preview with a modern, ATS-friendly template
- One-click PDF download
- Save and manage multiple resumes (stored locally in the browser)
- Pricing page with Free and Pro plans

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [html2canvas](https://html2canvas.hertzen.com/) + [jsPDF](https://github.com/parallax/jsPDF) for PDF export

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – run the production build

## Notes

Authentication and resume storage are currently demo implementations backed by
`localStorage`. Online payments and real authentication are planned for a future
release.
