# Description

the architecture for this project can be broken down into 5 different components.

- core: contains the core classes for pages and actions. all common actions and locators are present in core classes.
- page: contains the page object classes for storing page locators and locator generator methods
- actions: contains the action classes for executing page actions(login, logout, validation, etc.)
- data: contains the data files for the tests
- tests: contains the actual tests.

# Setup

### Required Tools:

- visual studio code(1.84.x or up)
- node(20.x.x or up)

### Required Visual Studio Code Extensions:

- eslint(https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- prettier(https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- playwright(https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

### Installation

1. clone the repository to your local machine
2. open the project in Visual Studio Code
3. open the terminal inside Visual Studio Code(terminal -> new terminal)
4. type the command: `npm i`
5. type the command: `npx playwright install`

### Test Execution:

- to start tests, run the following command in the terminal: `npm test`
