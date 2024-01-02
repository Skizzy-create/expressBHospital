# 🏥 Harkirat's BHospital Project - Cohort 0 - 100 Week 2.5 Assignment 🚀

![GitHub stars](https://img.shields.io/github/stars/Skizzy-create/expressBHospital?style=social)
![GitHub forks](https://img.shields.io/github/forks/Skizzy-create/expressBHospital?style=social)
![GitHub issues](https://img.shields.io/github/issues/Skizzy-create/expressBHospital)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Skizzy-create/expressBHospital)
![GitHub](https://img.shields.io/github/license/Skizzy-create/expressBHospital)

Welcome to the BHospital project! 👋 This is a simple Express.js server that manages user health data. It provides several routes to interact with the data, including retrieving user data, generating a health report, updating organ health, and deleting unhealthy organs.

## 📂 Project Structure

```
/myapp
    server.js
    /routes
        userRoutes.js
    /data
        userData.js
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
