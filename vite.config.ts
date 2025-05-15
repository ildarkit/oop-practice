import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        "1-procedural": "1-procedural/index.html",
        "2-encapsulation": "2-encapsulation/index.html",
        "3-concealment": "3-concealment/index.html",
        "4-polymorphism": "4-polymorphism/index.html",
      },
    },
  },
});
