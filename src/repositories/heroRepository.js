import { readFile, writeFile } from "node:fs/promises";

export default class HeroRepository {
  constructor({ file }) {
    this.file = file;
  }

  //Private
  async #currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  find() {
    return this.#currentFileContent();
  }

  async create(data) {
    const currentFile = await this.#currentFileContent();
    currentFile.push(data);
    writeFile(this.file, JSON.stringify(currentFile));

    return data.id;
  }
}

/*
const heroRepository = new HeroRepository({ file: "./database/data.json" });

console.log(
  await heroRepository.create({
    id: 2,
    name: "Superman",
  })
);

console.log(await heroRepository.find());

//console.log(heroRepository.find());)
*/
