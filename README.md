# MMA4A Class Schedule

A simple, calendar-based weekly schedule viewer for MMA4A (Multimedia Arts) courses. Built with React and Vite.

---

## Overview

This project renders a weekly timetable grid populated from a single data file. It is designed to be straightforward to edit and deploy. Course blocks are positioned on a Monday-through-Saturday calendar spanning 7:00 AM to 8:00 PM.

**Current term:** 1st Semester 2026-2027  
**Section:** MMA4A  
**Total units:** 15.0

### Enrolled Courses

| Code             | Title                                        | Units |
|------------------|----------------------------------------------|-------|
| MMA411           | Fundamentals in Film and Video Production    | 3.00  |
| MMA412           | Multimedia Seminars                          | 3.00  |
| MMAELEC III      | Brand Communications and Design              | 3.00  |
| MMAFREEELEC III  | Illustration and Cartooning                  | 3.00  |
| THESIS2          | Thesis Capstone Project 2                    | 3.00  |

---

## Features

- Weekly calendar grid with time-positioned course blocks
- Real-time clock synced to the browser, updating every second
- Current-time indicator line across the grid
- Active class highlighting with a subtle glow when a course is in session
- Course detail cards with schedule slots, instructor placeholders, and unit counts
- Dark theme with muted, non-distracting colors
- Print-friendly layout

---

## Project Structure

```
src/
  data/
    scheduleData.js   <-- Edit this file to change the schedule
  App.jsx             <-- Calendar renderer
  index.css           <-- Styles
  main.jsx            <-- Entry point
index.html
vite.config.js
package.json
```

---

## Editing the Schedule

All course data lives in a single file:

```
src/data/scheduleData.js
```

Each course entry follows this structure:

```js
{
  code: "MMA411",
  title: "Fundamentals in Film and Video Production",
  section: "MMA4A",
  units: 3.0,
  instructor: "TBA",   // Replace with assigned instructor
  room: "",             // Add room number when available
  color: "#3d4f6a",     // Block color on the calendar
  slots: [
    { day: "T",  start: "01:00PM", end: "03:00PM" },
    { day: "TH", start: "01:00PM", end: "04:00PM" },
  ],
}
```

**Day codes:** M (Monday), T (Tuesday), W (Wednesday), TH (Thursday), F (Friday), S (Saturday)

**Semester and section labels** are also defined at the top of the same file:

```js
export const SECTION = "MMA4A";
export const SEMESTER = "1st Semester 2026-2027";
```

---

## Local Development

Prerequisites: Node.js 18 or later.

```bash
npm install
npm run dev
```

The development server will start at `http://localhost:5173`.

---

## Production Build

```bash
npm run build
```

Output is written to the `dist/` directory.

---

## Deployment

This project is configured for static hosting. Deploy the `dist/` directory to any provider:

- **Vercel** -- Push to GitHub and import the repository. Vite is detected automatically.
- **Netlify** -- Set the build command to `npm run build` and the publish directory to `dist`.
- **GitHub Pages** -- Build locally and deploy the `dist/` folder.

---

## Tech Stack

- React 19
- Vite 6
- Vanilla CSS

---

## License

This project is provided for personal and academic use.
