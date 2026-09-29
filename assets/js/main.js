const uls = document.querySelectorAll("ul");

// Ordered list of workout days for progression
const DAY_ORDER = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"];
const CURRENT_DAY_KEY = "workoutTracker.currentDay";

// Get the day the user should currently be working on (defaults to Day 1)
function getCurrentDay() {
  const saved = localStorage.getItem(CURRENT_DAY_KEY);
  return DAY_ORDER.includes(saved) ? saved : "Day 1";
}

// Persist the day the user should currently be working on
function setCurrentDay(day) {
  localStorage.setItem(CURRENT_DAY_KEY, day);
}

// Mark a day complete and advance progression to the next day (loops after Day 6)
function completeDay(dayKey, btn) {
  if (btn) {
    btn.disabled = true;
    btn.classList.add("completed-pulse");
  }
  const idx = DAY_ORDER.indexOf(dayKey);
  const nextDay = DAY_ORDER[(idx + 1) % DAY_ORDER.length];
  setCurrentDay(nextDay);
  showSection(nextDay);
}

// Move progression back to the previous day (in case Complete was tapped by mistake)
function undoDay(dayKey, btn) {
  const idx = DAY_ORDER.indexOf(dayKey);
  if (idx <= 0) return; // already at Day 1, nothing to undo to
  if (btn) {
    btn.disabled = true;
    btn.classList.add("undo-pulse");
  }
  const prevDay = DAY_ORDER[idx - 1];
  setCurrentDay(prevDay);
  showSection(prevDay);
}

uls.forEach((ul) => {
  const resetClass = ul.parentNode.getAttribute("class");
  const lis = ul.querySelectorAll("li");

  lis.forEach((li) => {
    li.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.currentTarget;

      if (
        target.classList.contains("active") ||
        target.classList.contains("follow")
      ) {
        return;
      }

      // Update footer/tabbar class dynamically
      // ul.parentNode.setAttribute(
      //   "class",
      //   `${resetClass} ${target.getAttribute("data-where")}-style`
      // );

      // Remove old active
      lis.forEach((item) => clearClass(item, "active"));

      // Add new active
      setClass(target, "active");

      // Show the correct day (manual browsing only — does not change saved progress)
      const day = target.getAttribute("data-day");
      if (day) showSection(day);
    });
  });
});

function clearClass(node, className) {
  node.classList.remove(className);
}

function setClass(node, className) {
  node.classList.add(className);
}

// Strip a leading "1. " style number from an exercise name (index badge replaces it)
const stripLeadingNumber = (str) => str.replace(/^\d+\.\s*/, "");

// Split "1–2 RIR (drop to 0–1 RIR)" into a main value and an optional drop-set value
function parseRir(raw) {
  const m = raw.match(/^(.*?)\s*\((.*)\)\s*$/);
  const main = (m ? m[1] : raw).trim();
  const note = m ? m[2] : "";
  const isAmrap = /AMRAP/i.test(main);
  const drop = /^drop to /i.test(note) ? note.replace(/^drop to /i, "") : "";
  return {
    label: isAmrap ? "" : "RIR",
    value: isAmrap ? "To failure" : main.replace(/\s*RIR/i, ""),
    drop,
  };
}

// Split "60–90 sec; drop set no rest" into the main rest and whether a no-rest drop follows
function parseRest(raw) {
  const [main, extra] = raw.split(";").map((t) => t.trim());
  return { main, noRestDrop: !!extra };
}

// Build the compact meta row (RIR · Rest, plus a drop-set line when relevant)
function renderMeta(exercise) {
  const items = [];
  let dropLine = "";
  if (exercise.RIR) {
    const r = parseRir(exercise.RIR);
    items.push(
      `<span class="meta-item meta-rir"><i class="bi bi-lightning-charge-fill"></i>${r.label ? `<span class="meta-label">${r.label}</span>` : ""}<strong>${r.value}</strong></span>`
    );
    if (r.drop) dropLine = `Drop set to ${r.drop} RIR`;
  }
  if (exercise.Rest) {
    const t = parseRest(exercise.Rest);
    items.push(
      `<span class="meta-item meta-rest"><i class="bi bi-clock-fill"></i><span class="meta-label">Rest</span><strong>${t.main}</strong></span>`
    );
    if (dropLine && t.noRestDrop) dropLine += ", no rest";
  }
  if (!items.length) return "";
  return `
    <div class="exercise-meta">${items.join('<span class="meta-sep"></span>')}</div>
    ${dropLine ? `<div class="exercise-drop"><i class="bi bi-arrow-return-right"></i>${dropLine}</div>` : ""}
  `;
}

// Create a card for an exercise
const createExerciseCard = (exercise, index) => {
  const targetPanel = exercise.targetMuscle
    ? `
      <div class="exercise-target-panel">
        <div class="exercise-target-inner">
          <span class="material-icons-outlined">accessibility_new</span>
          <span>${exercise.targetMuscle}</span>
        </div>
      </div>`
    : "";
  return `
    <div class="exercise-card">
      <div class="exercise-card-row" onclick="toggleExerciseDetail(this)">
        <div class="exercise-card-main">
          <span class="exercise-index">${index + 1}</span>
          <div class="exercise-info">
            <div class="exercise-name">${stripLeadingNumber(exercise.exercise)}</div>
            <div class="exercise-detail">${exercise.detail}</div>
            ${renderMeta(exercise)}
          </div>
        </div>
      </div>
      ${targetPanel}
    </div>
  `;
};

// Slide the target-muscle panel open/closed when a row is tapped
function toggleExerciseDetail(rowEl) {
  const card = rowEl.closest(".exercise-card");
  const panel = card.querySelector(".exercise-target-panel");
  if (!panel) return;

  const isExpanded = card.classList.contains("expanded");
  card.classList.toggle("expanded", !isExpanded);
  panel.style.maxHeight = !isExpanded ? panel.scrollHeight + "px" : null;
}

// Render general warm-up
function renderGeneral() {
  return `
    <h2>General Warm-Up</h2>
    <div class="exercise-list">${generalWarmUp.map(createExerciseCard).join("")}</div>
  `;
}

// Render the "X of 6 days" progress dots for the current cycle
function renderProgressDots(dayKey) {
  const currentIdx = DAY_ORDER.indexOf(dayKey);
  const dots = DAY_ORDER.map((_, i) => {
    let cls = "dot";
    if (i < currentIdx) cls += " filled";
    if (i === currentIdx) cls += " current";
    return `<span class="${cls}"></span>`;
  }).join("");
  return `
    <div class="progress-dots" aria-label="Day ${currentIdx + 1} of ${DAY_ORDER.length}">
      ${dots}
      <span class="progress-label">Day ${currentIdx + 1} of ${DAY_ORDER.length}</span>
    </div>
  `;
}

// Render a specific day (exercises only). Undo/Complete buttons only show
// when this day is the user's actual current saved progress — browsing
// other days manually never lets you accidentally overwrite real progress.
function renderDay(dayKey) {
  const day = workoutData[dayKey];
  const data = day.mainExercises;
  const isCurrent = dayKey === getCurrentDay();
  const dayIdx = DAY_ORDER.indexOf(dayKey);
  const canUndo = dayIdx > 0;

  // Strip the leading "Day X: " prefix (redundant with the progress dots below),
  // then split "Chest & Triceps (Full Chest + Pump)" into a main title
  // and a small subtitle from the parenthetical part, if present.
  const nameNoPrefix = day.name.replace(/^Day\s*\d+:\s*/i, "");
  const nameMatch = nameNoPrefix.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  const titleMain = nameMatch ? nameMatch[1] : nameNoPrefix;
  const titleSub = nameMatch ? nameMatch[2] : "";

  const undoBtn = isCurrent
    ? `<button class="circle-btn undo-btn" ${canUndo ? "" : "disabled"} onclick="undoDay('${dayKey}', this)" title="${canUndo ? `Back to ${DAY_ORDER[dayIdx - 1]}` : "No previous day"}">
        <i class="bi bi-arrow-left-circle-fill"></i>
      </button>`
    : "";

  const completeBtn = isCurrent
    ? `<button class="circle-btn complete-btn" onclick="completeDay('${dayKey}', this)" title="Mark ${dayKey} complete">
        <i class="bi bi-arrow-right-circle-fill"></i>
      </button>`
    : "";

  return `
    <div class="day-header">
      <div class="day-header-top">
        <h2>${titleMain}${titleSub ? `<span class="day-subtitle">${titleSub}</span>` : ""}</h2>
        ${isCurrent ? `<div class="day-actions">${undoBtn}${completeBtn}</div>` : ""}
      </div>
      ${renderProgressDots(dayKey)}
    </div>
    <div class="exercise-list">${data.map(createExerciseCard).join("")}</div>
  `;
}

// Show section in main display
function showSection(section) {
  const display = document.getElementById("workout-display");
  if (section === "general") display.innerHTML = renderGeneral();
  else display.innerHTML = renderDay(section);

  // Highlight bottom nav buttons
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.textContent.trim() === section);
  });

  // Highlight footer icons
  document.querySelectorAll(".tabbar li").forEach((li) => {
    li.classList.toggle("active", li.getAttribute("data-day") === section);
  });
}

// Load the user's saved workout progress (completion-based, not date-based)
document.addEventListener("DOMContentLoaded", () => {
  showSection(getCurrentDay());
});
