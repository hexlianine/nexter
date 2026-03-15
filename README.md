# Nexter - Next.js Learning Sandbox

Nexter is an interactive project explorer designed to help developers master the conventions of the **Next.js App Router**. It provides a "living project tree" that visualizes the structure of a typical Next.js application, explaining the role of special files, route groups, and static assets.

## Features

- **Living Project Tree**: Explore a hands-on project structure inspired by real-world Next.js applications.
- **In-depth Learning Notes**: Click on any folder or file to see exactly why it exists and how it fits into the Next.js ecosystem.
- **Interactive Exploration**: Filter the tree, toggle expansions, and drill down into specific route segments like Dashboards, APIs, and Route Groups.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/) (Recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hexlianine/nexter.git
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to start exploring.

## Project Structure Explained

The sandbox itself covers these key areas:
- **App Router (`app/`)**: The core of Next.js routing, including layouts, pages, and loading states.
- **Route Groups `(learning/)`**: How to organize routes without affecting the URL structure.
- **API Handlers (`api/`)**: Building server-side endpoints within the App Router.
- **Shared Components (`components/`)**: Reusable UI building blocks.
- **Styles & Assets**: Organizing design tokens and static media.

## Built With

- **Next.js** - React framework for building web applications.
- **React** - JavaScript library for building user interfaces.
- **TypeScript** - Static typing for safer development.
- **CSS** - Premium, custom-styled interface.

---

Built to mirror Next.js conventions while keeping room for experimentation.
