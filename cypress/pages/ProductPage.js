class ProductPage {
  elements = {
    addToCartButton: () => cy.contains("a", "Add to cart"),
    cartLink: () => cy.get("#cartur"),
    productPrice: () => cy.get(".price-container"),
  };

  addToCart() {
    this.elements.addToCartButton().click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.contain("Product added");
    });
  }

  openCart() {
    this.elements.cartLink().click();
  }

  getProductPrice() {
    return this.elements.productPrice().invoke("text").then((text) => {
      return parseInt(text.replace(/\D/g, ""), 10);
    });
  }

}

export default new ProductPage();
