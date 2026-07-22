// ============================================================
//  SCHEDULE DATA  —  Edit this file to update the calendar.
//  Each course has: code, title, section, units, instructor,
//  color, and an array of time slots (day + start/end).
// ============================================================

export const SECTION = "MMA4A";
export const SEMESTER = "1st Semester 2026–2027";

export const courses = [
  {
    code: "MMA411",
    title: "Fundamentals in Film and Video Production",
    section: "MMA4A",
    units: 3.0,
    instructor: "TBA",        // ← placeholder, replace when assigned
    room: "",
    color: "#3d4f6a",
    slots: [
      { day: "T",  start: "01:00PM", end: "03:00PM" },
      { day: "TH", start: "01:00PM", end: "04:00PM" },
    ],
  },
  {
    code: "MMA412",
    title: "Multimedia Seminars",
    section: "MMA4A",
    units: 3.0,
    instructor: "TBA",
    room: "",
    color: "#4a5568",
    slots: [
      { day: "F", start: "07:00AM", end: "10:00AM" },
      { day: "F", start: "11:00AM", end: "03:00PM" },
    ],
  },
  {
    code: "MMAELEC III",
    title: "Brand Communications and Design",
    section: "MMA4A",
    units: 3.0,
    instructor: "TBA",
    room: "",
    color: "#56657a",
    slots: [
      { day: "TH", start: "09:00AM", end: "11:00AM" },
      { day: "T",  start: "09:00AM", end: "12:00PM" },
    ],
  },
  {
    code: "MMAFREEELEC III",
    title: "Illustration and Cartooning",
    section: "MMA4A",
    units: 3.0,
    instructor: "TBA",
    room: "",
    color: "#2d3e50",
    slots: [
      { day: "M", start: "01:30PM", end: "04:30PM" },
      { day: "W", start: "01:30PM", end: "05:30PM" },
    ],
  },
  {
    code: "THESIS2",
    title: "Thesis Capstone Project 2",
    section: "MMA4A",
    units: 3.0,
    instructor: "TBA",
    room: "",
    color: "#374151",
    slots: [
      { day: "F", start: "05:30PM", end: "07:00PM" },
      { day: "S", start: "05:30PM", end: "07:00PM" },
    ],
  },
];
