export default {
  ci: {
    collect: {
      numberOfRuns: 2,
      startServerCommand: "pnpm dev",
      startServerReadyPattern: "Local:",
      url: ["http://localhost:5173/", "http://localhost:5173/books", "http://localhost:5173/login"],
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
        "button-name": "error",
        "image-alt": "error",
        "link-name": "error",
        "meta-description": "error",
        "color-contrast": "error",
        "document-title": "error",
        "html-has-lang": "error",
        "valid-lang": "error",
        "tap-targets": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
