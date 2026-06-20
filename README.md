# 🎮 GameStore

A full-stack CRUD application for managing a video game catalog. The backend was built while following Julio Casal's [ASP.NET Core Full Course for Beginners](https://www.youtube.com/watch?v=AhAxLiGC7Pc), and the frontend is a custom React client built on top of it to practice connecting a real UI to a real REST API.

## Overview

**GameStore.Api** is a RESTful API built with ASP.NET Core Minimal APIs and Entity Framework Core. It exposes CRUD endpoints for games and a read endpoint for genres, backed by a SQLite database.

**GameStore.Frontend** is a React + Vite single-page app that consumes the API: it lists games, filters them by genre, and lets you add, edit, and delete games through a modal form.

---

### Screenshots

![Home Screen](./GameStore.Frontend/public/images/GameStore_1.png 'Home Screen')
_Home Screen_

![Filtered Items](./GameStore.Frontend/public/images/GameStore_2.png 'Filtered Items')
_Filtered Items_

![Add/Edit Modal](./GameStore.Frontend/public/images/GameStore_3.png 'Add-Edit Modal')
_Add/Edit Modal_

---

## Tech Stack

**Backend — `GameStore.Api`**

- ASP.NET Core Minimal API (.NET 10.0)
- Entity Framework Core + SQLite
- DTO-based request/response mapping (`CreateGameDto`, `UpdateGameDto`, `GameSummaryDto`, `GameDetailsDto`, `GenreDto`)

**Frontend — `GameStore.Frontend`**

- React (Vite)
- Tailwind CSS
- Fetch API (no extra HTTP client)

## Features

- Browse the full game catalog with name search and genre filtering
- Add, edit, and delete games through a modal form
- Genre data is pulled live from `/genres` and used to drive both the filter chips and color-coded genre badges
- Loading, empty, and error states, with a retry action if the API can't be reached
- Inline delete confirmation on each game card (no native browser `confirm()`)

## Project Structure

```
.
├── GameStore.Api          # ASP.NET Core Minimal API
│   ├── Data               # DbContext, EF Core migrations, seed data
│   ├── Dtos               # Request/response shapes
│   ├── Endpoints           # Games & genres route handlers
│   ├── Entities            # Game, Genre domain models
│   └── Mapping             # Entity <-> DTO mapping extensions
└── GameStore.Frontend     # React + Vite client
    └── src
        ├── components      # Filter, GameCard, Modal, Header, Loader, Empty, ErrorBanner
        └── utils           # API base URL, palette, shared constants
```

## Getting Started

### Prerequisites

- .NET SDK 10.0 or later
- Node.js 22+ and npm
- EF Core CLI tools (restored automatically via `dotnet-tools.json`)

### 1. Clone the repo

```bash
git clone https://github.com/KellyBytes/GameStore.git
cd GameStore
```

### 2. Run the API

```bash
cd GameStore.Api
dotnet restore
dotnet tool restore
dotnet ef database update
dotnet run
```

By default the API listens on `http://localhost:5292` (check `Properties/launchSettings.json` if yours differs).

### 3. Run the frontend

```bash
cd GameStore.Frontend
npm install
npm run dev
```

Open the local URL Vite prints in the terminal (typically `http://localhost:5173`).

> **API base URL:** the frontend's API address is set in `src/utils/index.js` (`API_BASE`). Update it there if your API runs on a different port.
>
> **CORS:** the frontend calls the API from a different origin during local development, so `GameStore.Api`'s `Program.cs` needs CORS enabled for the frontend's dev origin (e.g. via `AddCors` / `UseCors`), or browser requests from the React app will be blocked even though the API itself is running fine.

## API Endpoints

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| GET    | `/games`      | List all games          |
| GET    | `/games/{id}` | Get a single game       |
| POST   | `/games`      | Create a new game       |
| PUT    | `/games/{id}` | Update an existing game |
| DELETE | `/games/{id}` | Delete a game           |
| GET    | `/genres`     | List all genres         |

## What I Practiced

- Designing Minimal API endpoints with DTOs instead of exposing entities directly
- Writing and applying EF Core migrations, including a seed-data migration for genres
- Building a React UI around an API whose write shape (`genreId`) and read shape (`genre` name) don't match, and handling that mismatch in component state
- Debugging component re-creation and CORS issues end-to-end between a .NET backend and a Vite frontend

## Acknowledgments

- Backend built by following Julio Casal's free [ASP.NET Core Full Course for Beginners](https://www.youtube.com/watch?v=AhAxLiGC7Pc) on YouTube.
- Frontend designed and implemented independently as a companion CRUD client for the API.

## License

This project is licensed under the [MIT License](./LICENSE).
<br />

---

[🔼 Back to Top](#-gamestore)
