# 🏥 Harkirat's BHospital Project - Cohort 0 - 100 Week 2.5 Assignment 🚀

[![GitHub commits](https://img.shields.io/github/commits-since/Skizzy-create/expressBHospital/latest.svg)](https://github.com/Skizzy-create/expressBHospital/commits)
[![GitHub file size](https://img.shields.io/github/size/Skizzy-create/expressBHospital/README.md.svg)](https://github.com/Skizzy-create/expressBHospital/blob/main/README.md)
[![GitHub license](https://img.shields.io/github/license/Skizzy-create/expressBHospital.svg)](https://github.com/Skizzy-create/expressBHospital/blob/main/LICENSE)

🚀 Welcome to the **Bhakti Hospital** - a one-of-a-kind, spiritually-infused, digitally-powered health center! 🏥

This project is a testament to the power of JavaScript, showcasing its versatility in creating a unique health management system. It's not just about physical health, but also about spiritual health (bhakti) - because we believe in holistic healing! 💖

Built with **Express.js**, our project provides a robust set of routes to manage users and their health data. From adding new users to updating organ health, our routes have got you covered. And guess what? We've even got a route that calculates a user's maximum health based on a fun mix of physical and spiritual factors! 💪🧘‍♀️

Data validation is a breeze with **Zod**. We've defined schemas for every piece of data we handle, ensuring that everything is in the right format and keeping those pesky bugs at bay. 🐛🚫

Our middleware functions are the unsung heroes, quietly validating users and organs, counting requests, and even selecting operations. They're like the backstage crew that keeps the show running smoothly. 🎭

So, come on in and explore the Bhakti Hospital - where JavaScript, Express.js, and Zod come together to create a health management system like no other! 🎉

## 📂 Project Structure

```
+---expressBHospital
|   |   .gitattributes
|   |   LICENSE
|   |   README.md
|   |   structure.txt
|   |
|   \---Backend
|       |   server.js
|       |
|       +---data
|       |   |   data.js
|       |   |   userData.js
|       |
|       +---routes
|       |   |   userRoutes.js
|       |
|       \---utility
|           |   middlewares.js
|           |   schemas.js
|

```

## 🛠️ Installation

1. Clone the repository to your local machine using `git clone https://github.com/Skizzy-create/expressBHospital.git`.
2. Navigate to the project directory.
3. Install the required dependencies with `npm install`.

## 🚀 Usage

1. Start the server using `nodemon server.js`.
2. The server will start running at `https://localhost:3000`.

## 🚦 Routes

- `GET /`: Welcome route that sends a welcome message.
- `GET /getUser`: Retrieves user data based on the provided `id` query parameter.
- `GET /healtReport`: Generates a health report for a user based on the provided `id` query parameter. The health report includes the health points and the percentage of fitness.
- `PUT /updateOrgan`: Updates the health status of an organ for a user. Requires `id`, `organ`, and `ishealthy` in the request body.
- `DELETE /deleteOrgan`: Removes all unhealthy organs for a user based on the provided `id` query parameter.

## 🤝 Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.

## 📄 License

This project is licensed under the MIT License.
