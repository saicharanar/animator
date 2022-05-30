const { createTag } = require("./createTag");
const fs = require('fs');

class Iterator {
  constructor(list) {
    this.list = list;
    this.index = 0;
  }

  currentArg() {
    return this.list[this.index];
  }

  nexArg() {
    this.index++;
    this.index = this.index === this.list.length ? 0 : this.index;
    return this.currentArg();
  }
}

class Image {
  constructor(src) {
    this.src = src;
  }

  toHTML() {
    return createTag([
      'img',
      {
        src: this.src,
      }
    ]);
  }
}

const createHtmlImage = (image) => {
  return new Image(image).toHTML();
}

const createHtml = (image) => {
  const meta = '<meta http-equiv="refresh" content="0.1" />';
  const head = createTag(['head', {}, meta]);
  const body = createTag(['body', {}, image]);
  return createTag(['html', {}, head + body]);
};

const animate = (imagesItr, interval) => {
  setTimeout(() => {
    const image = createHtmlImage(imagesItr.currentArg());
    const html = createHtml(image);
    fs.writeFileSync('./index.html', html, 'utf8');
    imagesItr.nexArg();
    animate(imagesItr, interval);
  }, interval);
};

const animator = (images) => {
  const interval = 100;
  const imagesItr = new Iterator(images);
  animate(imagesItr, interval);
};

const main = (files) => {
  console.log(animator(files));
};

main(process.argv.slice(2));
