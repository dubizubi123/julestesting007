# Shopify App Starter Template (Node.js and React)

This is a barebones starter template for building a Shopify app using Node.js, Express, React, and Vite. It provides the basic setup for OAuth and a simple frontend using Shopify Polaris.

## Project Structure

- `package.json`: The main `package.json` for the backend.
- `web/`: Contains the backend server code.
  - `index.js`: The main Express server file.
  - `frontend/`: Contains the frontend React application.
    - `package.json`: The `package.json` for the frontend.
    - `vite.config.js`: Vite configuration file.
    - `index.jsx`: The entry point for the React app.
    - `App.jsx`: The main React component.
- `shopify.app.toml`: Configuration file for the Shopify CLI.
- `env.txt`: Example environment variables file.
- `.gitignore`: Git ignore file.

## Getting Started

### Prerequisites

- You must have [Node.js](https://nodejs.org/en/download/) and `npm` (or `yarn`/`pnpm`) installed.
- You must have a [Shopify partner account](https://partners.shopify.com/signup).
- You must have a development store to test your app.

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Set up environment variables:**
    -   Copy `env.txt` to a new file named `.env`:
        ```bash
        cp env.txt .env
        ```
    -   Open the `.env` file and fill in the values for `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`, and `HOST`. You can get the API key and secret from your app's page in your Shopify partner dashboard. The `HOST` should be the URL that points to your local server (e.g., from ngrok).

3.  **Install backend dependencies:**
    ```bash
    npm install
    ```

4.  **Install frontend dependencies:**
    ```bash
    cd web/frontend
    npm install
    cd ../..
    ```

### Running the App

1.  **Start the backend server:**
    ```bash
    npm run dev
    ```
    This will start the Express server on port 3000.

2.  **Start the frontend development server:**
    In a separate terminal, run:
    ```bash
    cd web/frontend
    npm run dev
    ```
    This will start the Vite development server.

3.  **Use a tunneling service (like ngrok) to expose your local server to the internet:**
    ```bash
    ngrok http 3000
    ```
    Take the `https` URL provided by ngrok and use it as the `HOST` in your `.env` file. You also need to update the app URL in your Shopify partner dashboard to use the ngrok URL.

4.  **Install the app on your development store:**
    -   Go to your Shopify partner dashboard, click on your app, and then on "Test your app".
    -   Select your development store.
    -   You will be redirected to the OAuth flow, and then to your app's home page.
