# Automated Tests for Demoblaze E-commerce Platform

This repository contains an automated test suite for [Demoblaze](https://www.demoblaze.com/), an e-commerce website where customers can buy electronics such as mobile phones, laptops, and more. The tests are implemented using Cypress and follow the Page Object Model (POM) to ensure maintainability and scalability.

## Project Structure
```
.
├── cypress
│   ├── e2e
│   │   ├── login.cy.js             # Login tests
│   │   ├── purchaseLaptop.cy.js    # Laptop purchase tests
│   ├── pages
│   │   ├── CartPage.js             # Cart functionality
│   │   ├── IndexPage.js            # Homepage navigation
│   │   ├── LoginPage.js            # Login functionality
│   │   ├── ProductPage.js          # Product details and actions
│   ├── support
│       ├── commands.js             # Custom Cypress commands
│── cypress.config.js               # Cypress configuration
├── package.json                    # Dependencies
└── README.md                       # Project documentation
```

---
## How to Run the Tests

Follow the steps carefully to set up the environment, run the tests, and understand the results.

### 1. Install Node.js and Cypress
Before running the tests, you need to install [Node.js](https://nodejs.org/) (recommended version: latest LTS). Then, install the project dependencies, including Cypress.

1. Open a terminal (Command Prompt, PowerShell, or a terminal in VS Code).
2. Navigate to the project folder:
   ```sh
   cd path/to/your/project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### 2. Open Cypress Test Runner (for interactive mode)
Cypress provides a graphical interface where you can manually trigger tests and watch them run.

1. Run the following command:
   ```sh
   npx cypress open
   ```
2. A Cypress window will appear. Click on **E2E Testing**.
3. Select **Chrome** as the browser (default).
4. Click **Start E2E Testing in Chrome**.
5. In the list of test files, click on any test (e.g., `login.cy.js` or `purchaseLaptop.cy.js`).
6. The test will run in real-time, and you'll see each step executed.

### 3. Run Tests in Headless Mode (for automation)
If you don't need the interactive UI and just want to execute tests in the terminal, use:
```sh
npx cypress run
```
This will:
- Run all test cases automatically.
- Display test progress in the terminal.
- Generate a summary of passed and failed tests.

### 4. Understanding the Test Results
After the tests finish:
- ✅ **All tests passed:** If all tests are green, the application behaves as expected.
- ❌ **Some tests failed:** If any test fails, you'll see an error message with details about what went wrong.
  - Open the Cypress Test Runner and re-run the test interactively to debug.
  - Check error messages for missing elements, incorrect assertions, or UI timing issues.

If you need to investigate failures further, Cypress automatically generates screenshots and videos (by default) in the `cypress/screenshots` and `cypress/videos` folders.


---
## Functionality Tested
### Login Tests
- User can log in successfully with valid credentials
- User can log out after successful login
- Login form closes when clicking the close button
- Error messages appear for incorrect passwords and non-existing users

### Laptop Purchase Flow
- User can add a laptop to the cart
- User can add multiple laptops and verify the total price
- User can remove items from the cart
- User can complete a full purchase process, filling out payment details and verifying success

---
## Why These Tests?

There was a tight deadline for creating these tests from scratch. Due to time constraints, the following trade-offs were chosen:

### 🔑 Login Functionality

- Ensuring that a customer can log in successfully is essential for the business to generate revenue and engage with users. 
- At the same time, it is crucial to prevent unauthorized access by properly verifying user credentials.

### 🛍️ Laptop Purchase Functionality
- The ability to purchase a product smoothly is a core business function. 
The tests prioritize the happy path of a successful purchase, ensuring that customers can add laptops to their cart and complete the checkout process. 
- Negative scenarios (e.g., failed payments) are lower priority and can be addressed later. 
- Additionally, verifying correct cart operations (adding and removing items) is crucial to ensure a seamless purchase experience.


### Design Decisions
- **Website instability**: The application sometimes responds with delays or inconsistent behavior, so direct waits (e.g., `cy.wait()`) have been used to stabilize the tests.
- **Page Object Model**: The test structure follows POM, making it easier to extend and maintain the test suite.
- **Laptop purchases focus**: The purchase tests are currently focused on laptops and are not generic enough to quickly add purchases for other types of electronics. Unfortunately, this was a trade-off due to time constraints.
- **Only Google Chrome browser support**: Currently, the tests are configured to run exclusively in Google Chrome. Expanding support to other browsers is a necessary next step to ensure broader compatibility.

---
## Future Improvements
- **Remove direct waits (`cy.wait()`)**: Implement more dynamic waiting strategies.
- **Cross-browser testing**: Currently, tests run only in Chrome; adding Firefox, Edge, and Safari support will improve coverage.
- **CI/CD integration**: Set up automated test execution in a pipeline using GitHub Actions to ensure that critical functionalities are automatically validated with every code change  
- **More test coverage**: Add negative scenarios for Laptop purchases, extend purchase functionality tests to include other categories

---
## Usage of AI
Grammarly AI was used to verify the correctness of the README.md file 