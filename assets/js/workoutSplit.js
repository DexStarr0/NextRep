const globalDailyWarmUp = [
  {
    exercise: "1. Treadmill brisk walk, cycling, or jump rope.",
    detail: "Duration: 3–5 minutes.",
  },
  {
    exercise: "2. Hip Flexor Stretch",
    detail: "30 sec/side – critical for desk workers.",
  },
  {
    exercise: "3. Thoracic Spine Rotations",
    detail: "5 reps/side – combat rounded shoulders.",
  },
  {
    exercise: "4. Cat-Cow Stretch",
    detail: "10 reps – spinal mobility.",
  },
  {
    exercise: "5. Shoulder Dislocations",
    detail: "10 reps – shoulder health.",
  },
  {
    exercise: "6. Band pull-aparts",
    detail: "3x20 before pressing days.",
  },
  {
    exercise: "7. Leg Swings",
    detail: "10 reps/side (front-to-back) – hip mobility.",
  },
  {
    exercise: "8. Ankle Rolls",
    detail: "10 reps/side – if you’re doing squats/deadlifts that day.",
  },
];

const workoutData = {
  "Day 1": {
    name: "Day 1: Chest & Triceps (Full Chest + Pump)",
    specificWarmUp: [
      {
        exercise: "1. Band Chest Stretch",
        detail: "1 minute: hold a band behind your back and stretch the chest.",
      },
      {
        exercise: "2. Incline Push-Ups",
        detail: "2 sets x 15 reps (warm up shoulders and chest).",
      },
      {
        exercise: "3. Band External Rotations",
        detail: "2 sets x 15 reps/side",
      },
    ],
    mainExercises: [
      {
        exercise: "1. Flat Barbell Bench Press",
        detail: "4 sets x 6-8",
        RIR: "1-2",
        Rest: "2-3 min",
      },
      {
        exercise: "2. Incline Hex Press",
        detail: "3 sets x 8-12",
        RIR: "1",
        Rest: "90s",
      },
      {
        exercise: "3. Standing High-to-Low Cable Fly",
        detail: "2 sets x 12-15 + drop",
        RIR: "0-1",
        Rest: "60-75s",
      },
      {
        exercise: "4. Cable Flyes (Mid-Chest)",
        detail: "3 sets x 15-20 + drop",
        RIR: "0-1",
        Rest: "60-75s",
      },
      {
        exercise: "5. Skull Crushers",
        detail: "3 sets x 10-12",
        RIR: "1",
        Rest: "75s",
      },
      {
        exercise: "6. Tricep Pushdowns",
        detail: "3 sets x 15-20",
        RIR: "0-1",
        Rest: "60s",
      },
    ],
  },

  "Day 2": {
    name: "Day 2: Back & Biceps (Upper Back + Width)",
    specificWarmUp: [
      {
        exercise: "1. Lat Stretch",
        detail: "1 minute/side: hang from a pull-up bar or doorframe.",
      },
      {
        exercise: "2. Banded Face Pulls",
        detail: "2 sets x 20 reps – added for rear delts",
      },
      {
        exercise: "3. Light Hammer Curls",
        detail: "2 sets x 15 reps: use 40% of your working weight.",
      },
    ],
    mainExercises: [
      {
        exercise: "1. Wide-Grip Pull-Ups",
        detail: "3 sets x AMRAP",
        RIR: "0",
        Rest: "2 min",
      },
      {
        exercise: "2. Chest-Supported Machine Row",
        detail: "4 sets x 8-12",
        RIR: "1-2",
        Rest: "90s",
      },
      {
        exercise: "3. Lat Pulldown (Wide Grip)",
        detail: "3 sets x 12-15",
        RIR: "1",
        Rest: "75s",
      },
      {
        exercise: "4. Wide-Grip T-Bar / Seated Cable Row",
        detail: "3 sets x 12-15",
        RIR: "1",
        Rest: "90s",
      },
      {
        exercise: "5. EZ-Bar Preacher Curl",
        detail: "3 sets x 8-12",
        RIR: "1",
        Rest: "75s",
      },
      {
        exercise: "6. Hammer Curl",
        detail: "3 sets x 10-12",
        RIR: "0-1",
        Rest: "60s",
      },
    ],
  },

  "Day 3": {
    name: "Day 3: Shoulders (Full Delt Emphasis)",
    specificWarmUp: [
      {
        exercise: "1. Band External Rotations",
        detail: "2 sets x 15 reps/side",
      },
      {
        exercise: "2. Scapular Push-Ups",
        detail: "2 sets x 10 reps",
      },
    ],
    mainExercises: [
      {
        exercise: "1. Barbell Back Squat",
        detail: "4 sets x 6-8",
        RIR: "1-2",
        Rest: "2-3 min",
      },
      {
        exercise: "2. Romanian Deadlift",
        detail: "3 sets x 8-10",
        RIR: "1-2",
        Rest: "2-3 min",
      },
      {
        exercise: "3. Hamstring Curl",
        detail: "3 sets x 10-15",
        RIR: "1-2",
        Rest: "90s",
      },
      {
        exercise: "4. Leg Extension",
        detail: "2 sets x 12-15",
        RIR: "1-2",
        Rest: "60-90s",
      },
      {
        exercise: "5. Barbell OHP",
        detail: "3 sets x 6-10",
        RIR: "1-2",
        Rest: "2-3 min",
      },
      {
        exercise: "6. Cable/Machine Lateral Raise",
        detail: "5 sets x 12-20",
        RIR: "1-2",
        Rest: "60-90s",
      },
      {
        exercise: "7. Reverse Pec Deck",
        detail: "2 sets x 12-20",
        RIR: "1-2",
        Rest: "60-90s",
      },
      {
        exercise: "8. Seated Calf Raise",
        detail: "3 sets x 10-20",
        RIR: "1-2",
        Rest: "60-90s",
      },
      {
        exercise: "9. Hanging Leg Raise",
        detail: "2 sets x 10-15",
        RIR: "1-2",
        Rest: "60-90s",
      },
    ],
  },

  "Day 4": {
    name: "Day 4: Legs (Hypertrophy Focus)",
    specificWarmUp: [
      {
        exercise: "1. Bodyweight Squats",
        detail: "2 sets x 20 reps: focus on depth.",
      },
      {
        exercise: "2. Glute Bridges",
        detail: "2 sets x 15 reps: fire up the posterior chain.",
      },
      {
        exercise: "3. Ankle Rolls",
        detail: "2 sets x 10 reps/side",
      },
    ],
    mainExercises: [
      {
        exercise: "1. Incline Dumbbell Press",
        detail: "3 sets x 8-12",
        RIR: "1-2",
        Rest: "90-120s",
      },
      {
        exercise: "2. Weighted Dips",
        detail: "3 sets x 8-10",
        RIR: "1-2",
        Rest: "2 min",
      },
      {
        exercise: "3. Incline Cable Fly (Low-to-High)",
        detail: "2 sets x 12-15 + drop",
        RIR: "0-1",
        Rest: "60-75s",
      },
      {
        exercise: "4. Standing High-to-Low Cable Fly",
        detail: "2 sets x 12-15 + drop",
        RIR: "0-1",
        Rest: "60-75s",
      },
      {
        exercise: "5. Overhead Tricep Extension",
        detail: "3 sets x 12-15",
        RIR: "1",
        Rest: "75s",
      },
      {
        exercise: "6. Rope Pushdowns",
        detail: "3 sets x 15-20",
        RIR: "0-1",
        Rest: "60s",
      },
    ],
  },

  "Day 5": {
    name: "Day 5: Chest & Triceps (Upper Chest Focus)",
    specificWarmUp: [
      {
        exercise: "1. Band Chest Stretch",
        detail: "1 minute: hold a band behind your back and stretch the chest.",
      },
      {
        exercise: "2. Incline Push-Ups",
        detail: "2 sets x 15 reps (warm up shoulders and chest).",
      },
      {
        exercise: "3. Band External Rotations",
        detail: "2 sets x 15 reps/side",
      },
    ],
    mainExercises: [
      {
        exercise: "1. Wide-Grip Pull-Ups",
        detail: "3 sets x AMRAP",
        RIR: "0",
        Rest: "2 min",
      },
      {
        exercise: "2. Deadlift",
        detail: "3 sets x 5-7",
        RIR: "1-2",
        Rest: "3 min",
      },
      {
        exercise: "3. Bent-Over Barbell Rows",
        detail: "3 sets x 8-12",
        RIR: "1-2",
        Rest: "90-120s",
      },
      {
        exercise: "4. Reverse-Grip Lat Pulldowns",
        detail: "3 sets x 8-12",
        RIR: "1",
        Rest: "90s",
      },
      {
        exercise: "5. Face Pulls",
        detail: "3 sets x 15-20",
        RIR: "0-1",
        Rest: "60s",
      },
      {
        exercise: "6. EZ-Bar Preacher Curl",
        detail: "3 sets x 8-12",
        RIR: "1",
        Rest: "75s",
      },
      {
        exercise: "7. Hammer Curl",
        detail: "3 sets x 10-12",
        RIR: "0-1",
        Rest: "60s",
      },
    ],
  },

  "Day 6": {
    name: "Day 6: Back & Biceps (Rear Delts + Thickness)",
    specificWarmUp: [
      {
        exercise: "1. Lat Stretch",
        detail: "1 minute/side: hang from a pull-up bar or doorframe.",
      },
      {
        exercise: "2. Banded Face Pulls",
        detail: "2 sets x 20 reps – added for rear delts",
      },
      {
        exercise: "3. Band Rows or Empty-Bar Bent-Over Rows",
        detail: "2 sets x 12 reps",
      },
    ],
    mainExercises: [
      {
        exercise: "1. Bulgarian Split Squat",
        detail: "3 sets x 8-12/leg",
        RIR: "1-2",
        Rest: "2 min",
      },
      {
        exercise: "2. Leg Press",
        detail: "3 sets x 10-15",
        RIR: "1-2",
        Rest: "2 min",
      },
      {
        exercise: "3. Hip Thrust",
        detail: "2 sets x 8-12",
        RIR: "1-2",
        Rest: "2 min",
      },
      {
        exercise: "4. Hamstring Curl",
        detail: "2 sets x 10-15",
        RIR: "1-2",
        Rest: "90s",
      },
      {
        exercise: "5. Standing Calf Raise",
        detail: "4 sets x 10-20",
        RIR: "1-2",
        Rest: "60-90s",
      },
      {
        exercise: "6. Seated DB OHP",
        detail: "3 sets x 8-12",
        RIR: "1-2",
        Rest: "2 min",
      },
      {
        exercise: "7. Cable Lateral Raise",
        detail: "5 sets x 12-20",
        RIR: "1-2",
        Rest: "60-90s",
      },
      {
        exercise: "8. Reverse Pec Deck",
        detail: "2 sets x 12-20",
        RIR: "1-2",
        Rest: "60-90s",
      },
      {
        exercise: "9. Cable Crunch",
        detail: "3 sets x 10-15",
        RIR: "1-2",
        Rest: "60-90s",
      },
    ],
  },
};
