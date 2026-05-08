# App Notas React

A modern, interactive note-taking application built with React, TypeScript, and Material-UI. Organize your thoughts with ease using an intuitive drag-and-drop interface and pin important notes to the top.

## Features

- ✨ **Create, Edit & Delete Notes** - Full CRUD operations for managing your notes
- 📌 **Pin Notes** - Keep important notes at the top of your list
- 🎯 **Drag & Drop Reordering** - Intuitive drag-and-drop interface with [@dnd-kit](https://docs.dndkit.com/) library
- 💾 **Persistent Storage** - Notes are automatically saved to a JSON database
- 🎨 **Modern UI** - Beautiful Material-UI components with responsive design
- 🚀 **Fast Development** - Powered by Vite for lightning-fast build times
- ✅ **TypeScript** - Full type safety with TypeScript support

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Library**: Material-UI (@mui/material)
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **Icons**: Lucide React
- **Backend**: JSON Server (for development)
- **Styling**: CSS Modules, Emotion

## Project Structure

```
src/
├── components/
│   ├── NotaForm/       # Form modal for creating/editing notes
│   └── NotaItem/       # Individual note card component
├── models/
│   └── nota.ts         # TypeScript interfaces and types
├── App.tsx             # Main application component
├── main.tsx            # React entry point
└── App.css             # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd app-notas-react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run both the development server and JSON backend:

1. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

2. In a separate terminal, start the JSON Server backend:
   ```bash
   npm run server
   ```
   The API will be available at `http://localhost:3001`

The Vite dev server is configured to proxy API requests from `/api` to `http://localhost:3001`, so you can make requests to `/api/notas` in your code.

### Building for Production

```bash
npm run build
```

This will compile TypeScript and create an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Usage

### Creating a Note

1. Click the **+** button to open the note creation form
2. Enter a title (optional) and note content
3. Click save to store the note

### Editing a Note

- Click on any note to open the edit form
- Modify the title or content
- Save your changes

### Pinning Notes

- Click the pin icon on any note to pin it to the top
- Pinned notes will always appear above unpinned notes

### Reordering Notes

- Click and drag notes to reorder them
- The order is automatically persisted to the database

### Deleting a Note

- Click the delete icon on a note to permanently remove it

## API Endpoints

The application uses a JSON Server backend with the following endpoints:

- `GET /api/notas` - Fetch all notes
- `POST /api/notas` - Create a new note
- `PATCH /api/notas/:id` - Update a note
- `DELETE /api/notas/:id` - Delete a note
- `PATCH /api/notas/reorder` - Reorder multiple notes

## Database Schema

Notes are stored with the following structure:

```typescript
interface Nota {
    id: number;
    titulo?: string;        // Optional note title
    nota: string;           // Note content
    order: number;          // Display order
    lastUpdatedAt: string;  // ISO timestamp of last update
    fijada: boolean;        // Whether note is pinned
}
```

## Configuration

### Vite Configuration

The `vite.config.ts` file includes a proxy configuration that routes API requests to the JSON Server backend running on port 3001.

### TypeScript Configuration

- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.app.json` - Application-specific TypeScript settings
- `tsconfig.node.json` - Configuration for Node.js files (Vite config)

### ESLint Configuration

The project uses ESLint with React-specific rules. Run `npm run lint` to check code quality.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Vite |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run server` | Start JSON Server backend |
| `npm run lint` | Run ESLint to check code quality |

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the project's linting standards by running `npm run lint` before submitting a pull request.

## Support

If you encounter any issues or have questions:

- Check the [Vite documentation](https://vitejs.dev/)
- Review the [React documentation](https://react.dev/)
- Check [@dnd-kit documentation](https://docs.dndkit.com/) for drag-and-drop issues
- Visit the [Material-UI documentation](https://mui.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Manuel Cardaba** (manucaragu02)

## Acknowledgments

- Built with [Vite](https://vitejs.dev/) for blazing fast development
- UI components from [Material-UI](https://mui.com/)
- Drag and drop powered by [@dnd-kit](https://docs.dndkit.com/)
