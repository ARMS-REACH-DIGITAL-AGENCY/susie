"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STORAGE_KEY = "susie-sculpts-evaluation-v2";

const faqs = [
  { q: "Is this evaluation private?", a: "Yes. Your answers are used to prepare a starting-point recommendation and help Susie understand what you may want to discuss. Your information is not displayed publicly." },
  { q: "Is this a diagnosis?", a: "No. This