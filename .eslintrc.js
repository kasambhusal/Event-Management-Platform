module.exports = {
  parser: "@typescript-eslint/parser", // Use the TypeScript parser
  extends: [
    "eslint:recommended", // Use recommended eslint rules
    "plugin:@typescript-eslint/recommended", // Use recommended TypeScript rules
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // Disable 'any' rule
    "no-var": "error", // Keep enforcing the use of let/const
    "react/no-unescaped-entities": "off", // Disable unescaped entities check
    "@typescript-eslint/no-unused-vars": "warn", // Warn for unused vars instead of error
  },
  parserOptions: {
    project: "./tsconfig.json", // Point to your tsconfig.json
  },
};
  