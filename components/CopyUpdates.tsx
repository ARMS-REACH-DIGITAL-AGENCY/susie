"use client";

import { useEffect } from "react";

const exactTextReplacements: Record<string, string> = {
  "Synergie Vacuum Massage": "Lymphatic Wellness Series",
  "PEMF Recovery & Wellness": "PEMF Recovery and Wellness Series",
  "EMShape Neo Body Sculpting": "Muscle + Strength + Tone Series",
  "Ultrasonic Cavitation & RF": "Body Contouring Series",
  "Fascia & Skin Revival": "Fascia and Skin Revival Series",
  "Pelvic Floor Strengthening": "Pelvic Floor Strengthening Series",
  "Find My Best First Step": "RECEIVE YOUR FREE\nPROFESSIONAL EVALUATION TODAY!",
};

const oldEvaluationParagraph