module.exports = {
  locales: ["en", "ru"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
};
