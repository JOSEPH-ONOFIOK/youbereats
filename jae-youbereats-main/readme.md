# UberEats Mock - React Native Clone

![UberEats Mock](https://link-to-demo-video.com) 
<!-- Replace "link-to-demo-video.com" with the actual link to your demo video -->

This repository contains a mobile application built with React Native and Expo, aiming to clone the core functionalities of the UberEats application. The project utilizes various dependencies and libraries to recreate the user experience of ordering food, browsing restaurants, and handling the delivery process.

## Demo Video

https://github.com/radoncreep/uber-eats-mock/assets/48057500/9d5008e0-26be-489e-8052-e9373961fb93


## Table of Contents

- [Introduction](#Introduction)
- [Features](#Features)
- [Installation](#Installation)
- [Usage](#Usage)
- [Technologies Used](#Technologies-Used)
- [Contributing](#Contributing)
- [License](#License)

## Introduction

UberEats Mock is a project that aims to replicate the core features of the popular UberEats mobile application. By using React Native and Expo, we have created a cross-platform app that provides users with a seamless experience while ordering food from nearby restaurants.

## Features

- User authentication and profile management
- Browse nearby restaurants and their menus
- Place food orders and manage the cart
- Real-time order tracking and status updates
- Integrated payment processing
- Restaurant reviews and ratings
- Delivery status and notifications

## Application of Clean Architecture in this Project

This project follows the guidelines of CLEAN architecture. It is seperated into 3 layers that is the Domain, Application and Adapter layers. 

In the Domain Layer, the use of SoC design principle is applied to encapsulate data and functions related to each entity such as the "Payment" entity. This is so that each of these entities have the responsibility of representing and managing only itself. It contains transformation functions for parsing, filtering, formatting, aggregation, sorting etc. What's even the importance of this? well, a few could be; reusability with any UI library/framework (react, angular, svelte, vue or vanillaJS if you're mad enough - tag me!), easy to automate test in isolation because it has no external dependencies just vanilla TS/JS code, modify to your needs (e.g when working on the Product domain you can choose modify functionalities that suit your business needs such as calculating discounts, promos, coupon bonus while using the <a href="https://github.com/radoncreep/uber-eats-mock/blob/cleanArch-refactor/src/domain/order.ts#L34">total cost function</a>).

## Installation

Follow these steps to get the project up and running on your local machine:

1. Ensure you have Node.js and npm (Node Package Manager) installed.
2. Clone this repository to your local machine using the following command:
   ```
   git clone https://github.com/radoncreep/uber-eats-mock.git
   ```
3. Navigate to the project directory:
   ```
   cd uber-eats-mock
   ```
4. Install the required dependencies:
   ```
   yarn
   ```
5. Install the Expo CLI globally (optional):
   ```
   yarn/npm add -g expo-cli
   ```

## Usage

To start the development server and run the app on your device or emulator, execute the following command:

```
expo start or yarn expo start (provided expo-cli isn't installed globally)
```

This will open the Expo Developer Tools in your browser. From there, you can launch the app on your preferred device or emulator.

## Technologies Used

- React Native
- Expo
- React Navigation
- Redux
- Axios HTTP Client
- and other dependencies (peep package.json)

## Contributing

Contributions to this project are welcome. If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

By order of Victor Onofiok I (the first).
