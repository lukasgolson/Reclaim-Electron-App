# Reclaim.AI Desktop App

This project is an open-source Electron application that packages the Reclaim.AI calendar app into a convenient desktop executable. It offers an easy-to-use, standalone experience for Reclaim.AI users by displaying the web application within a desktop container.

## Features

- Provides a seamless desktop experience for the Reclaim.AI calendar app
- Wraps the Reclaim.AI web application within an Electron container
- Cross-platform compatibility (macOS, Windows, and Linux)

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Contributing](#contributing)
4. [License](#license)

## Installation

Download the appropriate pre-built executable from our [releases](https://github.com/lukasdragon/Reclaim-Electron-App/releases)

## Building from Source

### Prerequisites 

Before you can run the Reclaim.AI Calendar Desktop App, make sure you have the following software installed on your system:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/downloads)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/lukasdragon/Reclaim-Electron-App.git
```

### Install Dependencies

Navigate to the project directory and install the required dependencies using Yarn:

```bash
cd Reclaim-Electron-App
yarn install
```

### Run the App

Start the application in development mode using the following command:

```bash
yarn start
```

## Usage

The Reclaim.AI Calendar Desktop App provides an intuitive desktop interface for the web-based Reclaim calendar app. After launching the application, simply log in to your Reclaim.AI account, and you'll have access to all the features of the web app within the convenience of a desktop application.

## Contributing

We appreciate contributions from the community! If you'd like to help improve the Reclaim Desktop App, please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b your-feature-branch-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin your-feature-branch-name`
5. Submit a pull request

Before submitting a pull request, please ensure that your changes do not conflict with the main branch and that all tests are passing.

## License

The Reclaim.AI Calendar Desktop App is licensed under the [MIT License](./LICENSE).