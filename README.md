# Country Explorer

A client-side web app that fetches and displays country information using the [REST Countries API](https://restcountries.com/).

Built as part of a lab exercise on API consumption and DOM manipulation.

## Features

- Search for any country by name
- Displays flag, capital, population, and region
- Shows bordering countries with their flags
- Loading spinner during API calls
- User-friendly error messages for invalid searches

## Tech Stack

- HTML, CSS, JavaScript (Vanilla)
- REST Countries API (`restcountries.com/v3.1`)
- Fetch API with async/await

## Setup

1. Clone the repo:
```bash
   git clone https://github.com/IcedMallard4334/country-explorer-api-lab.git
   cd country-explorer-api-lab
```
2. Open `index.html` in your browser — no build step needed.

## Usage

Type a country name into the search box and press **Search** or hit **Enter**.

Try:
- Countries with borders: *South Africa*, *Germany*, *Brazil*
- Island nations: *Japan*, *Australia*

## Live Demo

[View on GitHub Pages](https://github.com/IcedMallard4334/country-explorer-api-lab.git)

## Project Structure

```
├── index.html    # App structure and layout
├── styles.css    # Styling and animations
└── script.js     # API logic and DOM updates
```
