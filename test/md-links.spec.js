import { mdLinks, extrairLinks } from "../src/index.js"

const simpleArray = [
  {
    href: "https://pt.wikipedia.org/wiki/Markdown",
    text: "Markdown",
    file: './textos/text.md',
  },
  {
    href: "https://nodejs.org/",
    text: "Node.js",
    file: './textos/text.md',
  },
  {
    href: "https://nodejs.org/pt-br/",
    text: "Node.js",
    file: './textos/text.md',
  },
  {
    href: "https://developers.google.com/v8/",
    text: "Chrome",
    file: './textos/text.md',
  },
];

describe('mdLinks', () => {

  it('should be a function', () => {
    expect(typeof mdLinks).toBe("function")
  });
  it("should return a array of objects", async () => {
    const data = mdLinks('./textos/text.md', {});
    await expect(data).resolves.toEqual(simpleArray);
  });
});

describe('extrairLinks', () => {

  it('should be a function', () => {
    expect(typeof extrairLinks).toBe("function")
  });

});
