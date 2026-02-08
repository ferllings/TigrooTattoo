const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy({ "static/img": "img" });
  eleventyConfig.addPassthroughCopy({ "static/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "static/css": "css" });

  // Custom filter: readDir equivalent (CRITICAL for galleries)
  eleventyConfig.addFilter("readDir", function(dirPath) {
    try {
      const fullPath = path.join(__dirname, dirPath);
      if (!fs.existsSync(fullPath)) return [];

      return fs.readdirSync(fullPath, { withFileTypes: true })
        .map(dirent => ({
          Name: dirent.name,
          IsDir: dirent.isDirectory()
        }));
    } catch(e) {
      return [];
    }
  });

  // Custom filter: fileExists equivalent (CRITICAL for galleries)
  eleventyConfig.addFilter("fileExists", function(dirPath) {
    const fullPath = path.join(__dirname, dirPath);
    return fs.existsSync(fullPath);
  });

  // Custom filter: Category-based role conversion
  eleventyConfig.addFilter("categoryToRole", function(category) {
    const roles = {
      "tatouage": "Tatoueur",
      "piercing": "Piercing",
      "detatouage": "Spécialiste détatouage"
    };
    return roles[category] || "";
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "../_includes",
      data: "../_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
