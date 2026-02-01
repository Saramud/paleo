module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: ["expo", "prettier"],
  ignorePatterns: ["node_modules/", "dist/", "build/", ".expo/"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        semi: false,
        trailingComma: "all",
      },
    ],
  },
}
