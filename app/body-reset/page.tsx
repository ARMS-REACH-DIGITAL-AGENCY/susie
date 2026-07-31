"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const FULL_RESET_CHECKOUT_URL = "#stripe-full-reset-link-needed";
const SYNERGIE_SERIES_CHECKOUT_URL = "#stripe-synergie-series-link-needed";
const PEMF_CHECKOUT_URL = "#stripe-pemf-series-link-needed";
const CONTOUR_BUNDLE_CHECKOUT_URL = "#stripe-contour-package-link-needed";
const CAV