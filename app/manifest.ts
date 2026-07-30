import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Susie Sculpts",
    short_name: "Susie Sculpts",
    description:
      "Private body reset, Synergie Vacuum Massage, lymphatic, PEMF, and body sculpting support in Gilbert, Arizona.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fbf8f3",
    theme_color: "#7251a5",
    icons: [
      {
        src: "/images/Susie_favicon.png?v=4",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/Susie_favicon.png?v=4",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/Susie_favicon.png?v=4",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/Susie_favicon.png?v=4",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
