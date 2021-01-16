class Section {
  constructor(name, data) {
    this.sectionName = name;
    this.sectionData = data;
  }

  get data() {
    return this.sectionData;
  }
}

module.exports = Section;
