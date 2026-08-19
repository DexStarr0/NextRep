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

// Create a card for an exercise, with RIR/Rest shown as badges when present
const createExerciseCard = (exercise, index) => {
  const badges = [];
  if (exercise.RIR) {
    badges.push(`<span class="badge badge-rir">RIR ${exercise.RIR}</span>`);
  }
  if (exercise.Rest) {
    badges.push(
      `<span class="badge badge-rest"><span class="material-icons-outlined">schedule</span>${exercise.Rest}</span>`
    );
  }
  return `
    <div class="exercise-card">
      <div class="exercise-card-main">
        <span class="exercise-index">${index + 1}</span>
        <div class="exercise-info">
          <div class="exercise-name">${stripLeadingNumber(exercise.exercise)}</div>
          <div class="exercise-detail">${exercise.detail}</div>
        </div>
      </div>
      ${badges.length ? `<div class="exercise-badges">${badges.join("")}</div>` : ""}
    </div>
  `;
};

// Render general warm-up
function renderGeneral() {
  return `
    <h2>General Warm-Up</h2>
    <div class="exercise-list">${globalDailyWarmUp.map(createExerciseCard).join("")}</div>
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
