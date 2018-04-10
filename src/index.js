const fs = require('fs');
const path = require('path');

const currentDirectory = process.cwd();

module.exports = class koa {
  constructor(options = {}) {
    this.cssDir = (typeof options.sourceDir === 'string') ? options.sourceDir : './public/assets/css';
    this.jsDir = (typeof options.sourceDir === 'string') ? options.sourceDir : './public/assets/js';
  }

  setup(app) {
    const assets = {};
    if (this.cssDir) {
      assets.css = fs.readdirSync(path.join(currentDirectory, this.cssDir));
      assets.css = assets.css || [];
    }

    if (this.jsDir) {
      assets.js = fs.readdirSync(path.join(currentDirectory, this.jsDir));
      assets.js = assets.js || [];
    }

    app.use(async (ctx, next) => {
      ctx.state.assets = assets;
      await next();
    });
  }
};
