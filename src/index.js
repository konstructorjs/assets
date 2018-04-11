const fs = require('fs');
const path = require('path');

const currentDirectory = process.cwd();

module.exports = class koa {
  constructor(options = {}) {
    this.cssDir = (typeof options.sourceDir === 'string') ? options.sourceDir : './public/assets/css';
    this.jsDir = (typeof options.sourceDir === 'string') ? options.sourceDir : './public/assets/js';
  }

  setup(app) {
    app.use(async (ctx, next) => {
      const assets = {};
      if (this.cssDir && fs.existsSync(path.join(currentDirectory, this.cssDir))) {
        assets.css = fs.readdirSync(path.join(currentDirectory, this.cssDir));
        assets.css = assets.css || [];
      }

      if (this.jsDir && fs.existsSync(path.join(currentDirectory, this.jsDir))) {
        assets.js = fs.readdirSync(path.join(currentDirectory, this.jsDir));
        assets.js = assets.js || [];
      }
      ctx.state.assets = assets;
      await next();
    });
  }
};
