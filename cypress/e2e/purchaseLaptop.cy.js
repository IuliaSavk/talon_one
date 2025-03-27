import IndexPage from "../pages/IndexPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";

describe("Laptop Purchase Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    IndexPage.navigateToLaptops();
  });

  it("User can add a single laptop to the cart", () => {
    IndexPage.selectLaptop(Cypress.env("singleLaptop"));
    cy.wait(1000);

    ProductPage.getProductPrice().then((price) => {
      cy.wrap(price).as("productPrice");
    });

    ProductPage.addToCart();
    ProductPage.openCart();
    cy.wait(1000);

    cy.get("@productPrice").then((price) => {
      CartPage.verifyTotalPrice(price);
      CartPage.verifyCartItemCount(1);
    });
  });

  it("User can add multiple laptops to the cart and verify the total price", () => {
    let totalPrice = 0;

    cy.wrap(Cypress.env("laptops")).each((laptop) => {
      IndexPage.selectLaptop(laptop);
      cy.wait(1000);

      ProductPage.getProductPrice().then((price) => {
        totalPrice += price;
        ProductPage.addToCart();
      });

      // Instead of cy.go("back"), click "Home" then navigate to Laptops again
      cy.contains("Home").click();
      IndexPage.navigateToLaptops();
    });

    ProductPage.openCart();

    cy.then(() => {
      CartPage.verifyTotalPrice(totalPrice);
      CartPage.verifyCartItemCount(Cypress.env("laptops").length);
    });
  });

  it("User can remove a laptop from the cart and verify the cart is empty", () => {
    IndexPage.selectLaptop(Cypress.env("singleLaptop"));
    cy.wait(1000);

    ProductPage.getProductPrice().then((price) => {
      cy.wrap(price).as("productPrice");
    });

    ProductPage.addToCart();
    ProductPage.openCart();
    cy.wait(1000);

    CartPage.verifyCartItemCount(1);
    CartPage.removeItemFromCart(Cypress.env("singleLaptop"));
    CartPage.verifyCartItemCount(0)
  });

  it("User can complete a full purchase process for a laptop", () => {
    IndexPage.selectLaptop(Cypress.env("singleLaptop"));
    cy.wait(3000);

    ProductPage.getProductPrice().then((price) => {
      cy.wrap(price).as("productPrice");
    });

    ProductPage.addToCart();
    ProductPage.openCart();
    cy.wait(3000);

    cy.get("@productPrice").then((price) => {
      CartPage.verifyTotalPrice(price);
      CartPage.verifyCartItemCount(1);
    });

    cy.generatePurchaseDetailsData().then((purchaseDetails) => {
      cy.wrap(purchaseDetails).as("purchaseData");

      CartPage.proceedToCheckout();

      CartPage.fillPurchaseForm(purchaseDetails);
      CartPage.confirmPurchase();

      cy.get("@purchaseData").then((data) => {
        CartPage.verifyPurchaseSuccess(data);
      });
    });

    cy.wait(1000);
    CartPage.closePurchaseSuccessModal();
    CartPage.verifyCartIsEmpty();
  });
});
