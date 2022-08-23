module.exports = {
  overrides: [
    {
      files: "**/*.vue",
      options: {
        htmlWhitespaceSensitivity: "ignore",
      },
    },
    {
      files: ".*rc",
      options: { parser: "json" },
    },
    {
      files: ["**/*.{yml,yaml,md}"],
      options: { tabWidth: 2, embeddedLanguageFormatting: "off" },
    },
  ],
};
