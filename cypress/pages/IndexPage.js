class IndexPage {
  elements = {
    laptopsCategory: () => cy.contains("Laptops"),

  };

  navigateToLaptops() {
    this.elements.laptopsCategory().click();
  }

  selectLaptop(laptopName) {
    cy.contains(laptopName).click();
  }
}

export default new IndexPage();