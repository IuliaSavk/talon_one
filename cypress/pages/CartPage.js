class CartPage {
  elements = {
    cartItems: () => cy.get("#tbodyid tr"),
    totalPrice: () => cy.get("#totalp"),
    placeOrderButton: () => cy.contains("button", "Place Order"),
    purchaseForm: {
      name: () => cy.get("#name"),
      card: () => cy.get("#card"),
      month: () => cy.get("#month"),
      year: () => cy.get("#year"),
      purchaseButton: () => cy.contains("button", "Purchase"),
    },
    successMessage: () => cy.contains("Thank you for your purchase!"),
    orderDetails: () => cy.get(".sweet-alert").find("p"),
  };

  verifyCartItemCount(expectedCount) {
    this.elements.cartItems().should("have.length", expectedCount);
  }

  verifyTotalPrice(expectedTotal) {
    this.elements.totalPrice().should("have.text", expectedTotal.toString());
  }

  proceedToCheckout() {
    this.elements.placeOrderButton().click();
  }

  fillPurchaseForm({ name, card, month, year }) {
    this.elements.purchaseForm.name().type(name);
    cy.wait(500); // Sometimes UI can't take the input immediately, so we should wait
    this.elements.purchaseForm.card().type(card);
    cy.wait(500);
    this.elements.purchaseForm.month().type(month);
    cy.wait(500);
    this.elements.purchaseForm.year().type(year);
    cy.wait(500);
  }

  confirmPurchase() {
    this.elements.purchaseForm.purchaseButton().click();
  }

  verifyPurchaseSuccess({ name, card }) {
    this.elements.successMessage().should("be.visible");

    this.elements.orderDetails().then((details) => {
      const text = details.text();
      expect(text).to.include(`Name: ${name}`);
      expect(text).to.include(`Card Number: ${card}`);
    });
  }

  closePurchaseSuccessModal() {
    cy.contains("OK").click();
  }

  verifyCartIsEmpty() {
    cy.contains("Cart").click();
    this.elements.cartItems().should("not.exist");
  }

  removeItemFromCart(productName) {
    cy.contains(productName)
      .parent() // Navigate to the item's row
      .parent()
      .contains("Delete")
      .click();

    cy.wait(1000); // Wait for deletion to process
  }
}

export default new CartPage();
