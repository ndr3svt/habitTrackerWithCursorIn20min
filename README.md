# Atomic Habits Tracker

A simple yet powerful habit tracking application built with Bun.js and modern web standards. This application helps you build and maintain habits following the principles of atomic habits - making them small, measurable, and stackable.

## Features

- 📝 Create and track daily habits
- 📊 Track quantities and units (pages read, kilometers run, etc.)
- 🎯 Set target quantities for measurable habits
- 🔥 Streak tracking for consistent habit completion
- 📈 Visual analytics with habit completion stats
- 🗂️ Organize habits into sectors (Health, Learning, etc.)
- 🔄 Drag and drop interface for habit stacking
- 📱 Responsive design that works on all devices
- 📅 History tracking for each habit

## Prerequisites

- [Bun](https://bun.sh) installed on your system

## Installation

1. Clone the repository:

    bun install

2. Create required directories:

    mkdir -p public data

3. Initialize the data file:

    echo "[]" > data/habits.json

## Running the Application

Start the server:

    bun run src/server.ts

The application will be available at http://localhost:3000

## Usage

### Adding a Habit

1. Enter the habit name in the input field
2. (Optional) Specify a sector (e.g., Health, Learning)
3. (Optional) Add a unit of measurement (e.g., pages, km, minutes)
4. (Optional) Set a target quantity
5. Click "Add Habit"

### Managing Habits

- Check the checkbox to mark a habit as complete
- For habits with units, enter the quantity achieved
- Drag and drop habits to reorder them
- View your streaks (🔥) for each habit
- Monitor your progress in the analytics section

## Project Structure

    atomic-habits/
    ├── src/
    │   └── server.ts      # Bun server implementation
    ├── public/
    │   └── index.html     # Frontend application
    ├── data/
    │   └── habits.json    # Data storage
    └── README.md

## Technology Stack

- Runtime: Bun.js
- Frontend: Vanilla JavaScript with Web Components
- Styling: Tailwind CSS (via CDN)
- Design System: Following shadcn/ui guidelines
- Charts: Chart.js
- Drag & Drop: Sortable.js

## Data Storage

Habits are stored in data/habits.json with the following structure:

    {
      id: string            // Unique identifier
      name: string         // Habit name
      completed: boolean   // Daily completion status
      date: string        // Current date
      sector: string      // Category (e.g., "Health")
      unit?: string       // Optional unit (e.g., "km")
      quantity?: number   // Optional amount completed
      targetQuantity?: number  // Optional goal amount
      order: number       // Display order
      streak: number      // Current streak
      history: [         // Completion history
        {
          date: string
          completed: boolean
          quantity?: number
        }
      ]
    }

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
