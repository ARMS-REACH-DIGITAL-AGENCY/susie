"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type Product = {
  name: string;
  count: number;
  price: number;
  duration: number | null;
  href: string;
  includedValue?: number;
};

type FamilyKey = "ultimate" | "muscle" | "body" | "fascia" | "pelvic" | "lymph