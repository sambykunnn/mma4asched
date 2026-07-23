import React, { useState, useRef, useEffect } from 'react';
import { courses, SECTION, SEMESTER } from './data/scheduleData';

// ── Constants ──
const DAYS       = ['M', 'T', 'W', 'TH', 'F', 'S'];
const DAY_LABEL  = { M: 'Mon', T: 'Tue', W: 'Wed', TH: 'Thu', F: 'Fri', S: 'Sat' };
const DAY_FULL   = { M: 'Monday', T: 'Tuesday', W: 'Wednesday', TH: 'Thursday', F: 'Friday', S: 'Saturday' };
const JS_DAY_MAP = { 0: null, 1: 'M', 2: 'T', 3: 'W', 4: 'TH', 5: 'F', 6: 'S' };

const GRID_START = 420;  // 7 AM
const GRID_END   = 1200; // 8 PM
const HOURS      = 13;

// ── Helpers ──
function toMin(s) {
  const u = s.toUpperCase().replace(/\s/g, '');
  const pm = u.includes('PM');
  const [h, m] = u.replace(/[AP]M/, '').split(':').map(Number);
  let hr = h;
  if (pm && hr < 12) hr += 12;
  if (!pm && hr === 12) hr = 0;
  return hr * 60 + m;
}

function fmtHour(m) {
  let h = Math.floor(m / 60);
  const p = h >= 12 ? 'PM' : 'AM';
  if (h > 12) h -= 12;
  if (h === 0) h = 12;
  return `${h} ${p}`;
}

function expandDay(code) {
  const d = code.toUpperCase();
  if (d === 'TH') return ['TH'];
  if (d === 'FS') return ['F', 'S'];
  if (d === 'MW') return ['M', 'W'];
  if (d === 'TTH') return ['T', 'TH'];
  const out = [];
  let i = 0;
  while (i < d.length) {
    if (d.substring(i, i + 2) === 'TH') { out.push('TH'); i += 2; }
    else { out.push(d[i]); i++; }
  }
  return out;
}

// ── Build events ──
function buildEvents() {
  const list = [];
  courses.forEach(c => {
    c.slots.forEach(sl => {
      expandDay(sl.day).forEach(dk => {
        list.push({
          id: c.code,
          title: c.title,
          instructor: c.instructor,
          room: c.room,
          color: c.color,
          dayKey: dk,
          s: toMin(sl.start),
          e: toMin(sl.end),
          label: `${sl.start}–${sl.end}`,
        });
      });
    });
  });
  return list;
}

// ── Component ──
export default function App() {
  const bodyRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // tick every second for live clock + now indicator
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const events    = buildEvents();
  const total     = courses.reduce((s, c) => s + c.units, 0);
  const pxPerMin  = dims.h / (GRID_END - GRID_START);
  const colW      = dims.w / 6;

  // current time position
  const todayKey  = JS_DAY_MAP[now.getDay()];
  const nowMin    = now.getHours() * 60 + now.getMinutes();
  const showNow   = todayKey && nowMin >= GRID_START && nowMin <= GRID_END;
  const nowTop    = (nowMin - GRID_START) * pxPerMin;

  // format real-time clock
  const clockH = now.getHours() % 12 || 12;
  const clockM = String(now.getMinutes()).padStart(2, '0');
  const clockS = String(now.getSeconds()).padStart(2, '0');
  const clockP = now.getHours() >= 12 ? 'PM' : 'AM';
  const clockStr = `${clockH}:${clockM}`;

  // helper: is an event active right now?
  function isActive(ev) {
    return ev.dayKey === todayKey && nowMin >= ev.s && nowMin < ev.e;
  }

  return (
    <div className="shell">
      {/* Header */}
      <div className="top-bar">
        <div className="top-left">
          <h1>MMA4A Class Schedule</h1>
          <div className="sub">{SEMESTER} · Section {SECTION}</div>
        </div>
        <div className="pill-row">
          <div className="pill clock-pill">{clockStr}<span className="clock-seconds">:{clockS}</span> {clockP}</div>
          <div className="pill">Courses <strong>{courses.length}</strong></div>
          <div className="pill">Units <strong>{total.toFixed(1)}</strong></div>
        </div>
      </div>

      {/* Main two-panel layout */}
      <div className="main-layout">
        {/* Calendar */}
        <div className="cal">
          {/* Day headers */}
          <div className="cal-head">
            <div className="cal-head-cell">TIME</div>
            {DAYS.map(d => (
              <div
                key={d}
                className={`cal-head-cell${d === todayKey ? ' today' : ''}`}
              >
                {DAY_LABEL[d]}
              </div>
            ))}
          </div>

          {/* Grid body */}
          <div className="cal-body">
            <div className="grid-rows" ref={bodyRef}>
              {Array.from({ length: HOURS }).map((_, i) => (
                <React.Fragment key={i}>
                  <div className="grid-time">{fmtHour(GRID_START + i * 60)}</div>
                  {DAYS.map(d => <div className="grid-cell" key={d} />)}
                </React.Fragment>
              ))}
            </div>

            {/* Current-time line */}
            {dims.h > 0 && showNow && (
              <div className="now-line" style={{ top: nowTop }} />
            )}

            {/* Events */}
            {dims.h > 0 && (
              <div className="ev-layer">
                {events.map((ev, i) => {
                  const col = DAYS.indexOf(ev.dayKey);
                  if (col < 0) return null;

                  const top = (ev.s - GRID_START) * pxPerMin;
                  const h   = (ev.e - ev.s) * pxPerMin;
                  const tall = h > 55;
                  const active = isActive(ev);

                  return (
                    <div
                      className={`ev${active ? ' active' : ''}`}
                      key={i}
                      style={{
                        top, height: h,
                        left: col * colW + 2,
                        width: colW - 4,
                        backgroundColor: ev.color,
                        animationDelay: `${i * 0.04}s`,
                      }}
                      title={`${ev.id}\n${ev.title}\n${ev.label}\nInstructor: ${ev.instructor}${ev.room ? `\nRoom: ${ev.room}` : ''}`}
                    >
                      <div>
                        <div className="ev-code">{ev.id}</div>
                        {tall && <div className="ev-name">{ev.title}</div>}
                      </div>
                      <div className="ev-bottom">
                        <span className="ev-time">{ev.label}</span>
                        {tall && <span className="ev-instructor">{ev.instructor}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Course Cards */}
        <div className="courses-section">
          <div className="courses-label">Enrolled Courses</div>
          <div className="cards">
            {courses.map(c => (
              <div className="card" key={c.code}>
                <div className="card-accent" style={{ background: c.color }} />
                <div className="card-code">{c.code}</div>
                <div className="card-title">{c.title}</div>
                <div className="card-meta">
                  <span className="tag">{c.units} units</span>
                  <span className="tag">{c.section}</span>
                  <span className="tag">{c.instructor}</span>
                  {c.room && <span className="tag">{c.room}</span>}
                </div>
                <div className="card-slots">
                  {c.slots.map((sl, j) => (
                    <div className="slot-line" key={j}>
                      <span className="slot-day">{sl.day}</span>
                      <span>{sl.start}–{sl.end}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="foot">
        MMA4A Schedule · {SEMESTER} · {courses.length} courses · {total.toFixed(1)} total units
      </div>
    </div>
  );
}
