/**
 * Class responsible for storing section of an wikipedia article
 */
class Section {
  #sectionName;
  #sectionData;
  constructor(name, data) {
    this.#sectionName = name;
    this.#sectionData = data;
  }

  get title() {
    return this.#sectionName;
  }

  get data() {
    return this.#sectionData;
  }
}

module.exports = Section;
