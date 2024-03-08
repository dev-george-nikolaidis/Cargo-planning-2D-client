# Cargo Planning

## Description

Cargo Planning is a web application designed to manage and visualize truck trips, facilitating efficient logistics and transportation management. The application features a client-side built with React, TypeScript, and SCSS modules, complemented by a server-side API developed using Node.js, TypeScript, and Express.js, and powered by a MySQL database.

## Folder Structure

- `client/`: Frontend application
  - Built with React, TypeScript, and SCSS modules.
- `server/`: Backend API
  - Developed using Node.js, TypeScript, and Express.js.
- `Database`: MySQL

## Client-Side Application (React)

### Global State Management with Context API

#### Trip Context (`tripContext.tsx`)
- **Purpose:** Manages state related to trip data, including trip orders and user interactions.
- **Key Features:**
  - State Management: Uses `useReducer` for complex state logic.
  - Global Accessibility: Provides a central state accessible by any component.

#### User Context (`userContext.tsx`)
- **Purpose:** Manages user-specific data across the application.
- **Key Features:**
  - Consistent Access: Uses `useReducer` for consistent user data access.

### Custom Hooks for Enhanced Functionality

#### `useFetchAxios` Hook
- **Purpose:** Simplifies HTTP requests and response handling.
- **Functionality:** Encapsulates Axios for data fetching.

#### `useTruckDesign` Hook
- **Purpose:** Adjusts truck visual representation based on screen width and truck size.
- **Functionality:** Calculates design scales for responsive visualizations, built to support further truck sizes if necessary. The current default truck, named "trailerStandard", is 13.6x2.4 meters and supports a maximum of 33 Euro pallets.

#### `useWindowSizeTracker` Hook
- **Purpose:** Tracks window size for responsive designs.
- **Functionality:** Updates component state with window dimensions.

### UI Components for Data Visualization and Interaction

#### ProgressBar and Spinner Components
- **Purpose:** Visual indicators for progress and loading states.
- **Key Features:**
  - ProgressBar: Visualizes remaining LDM.
  - Spinner: Indicates background activity.

#### Main Components

##### Trip Component (`Trip.tsx`)
- **Purpose:** Main entry for the trip page, managing data and view switching.
- **Key Features:**
  - Data Fetching: Uses `useFetchAxios` and context.
  - Dynamic Rendering: Switches between `TripContainerSide` and `TripContainerTop`.

##### Sub-components in `components` Directory
- `tripContainerSide`: Side view of trucks with drag-and-drop.
- `tripContainerTop`: Top view focusing on item arrangement.

### Styling
- SCSS Modules: Scoped styles to prevent global namespace pollution.
- Responsive Design: Adapts to different viewport sizes supporting drag and drop even at mobile sizes.

## Prerequisites

- Node.js (Version 16 or later)
- MySQL version 8
- npm

## Installation

### Setting Up the Server

1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Set up your MySQL database.
4.  Create `.env` file and configure the environment variables as per the guidelines found in `.env.example`.
5. Load the database backup file `cargo.sql` located in `server/src/v1/database/`.
6. Start the server: `npm run dev`
7. You can find the database schema diagram under `server/src/v1/database/diagram.png`.

### Setting Up the Client

1. Navigate to the client directory: `cd ../client`
2. Install dependencies: `npm install`
3. Start the frontend application: `npm run dev`
4. Access the app at [http://localhost:5173/trip/side/1](http://localhost:5173/trip/side/1)
