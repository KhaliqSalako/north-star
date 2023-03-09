## North Star

North Star is a web application that allows users to easily plan trips, events, and dates using Google API. With North Star, users can create and organize their itineraries, add locations and activities, and share their plans with friends and family. The application leverages Google's powerful mapping and search capabilities to help users discover new places and attractions, and provides useful information such as directions. North Star aims to simplify the process of planning and sharing travel experiences, making it easy and fun to explore new destinations. North Star features an intuitive user interface that makes it easy to create and edit trips, events, and dates. Users can customize their itineraries by selecting different activities and destinations, and can view their plans on a map or as a list. The application uses Google's Map API to search for places of interest, such as restaurants, museums, and landmarks, based on user preferences and location.

## Table of contents

- Requirements
- Installation
- Tech Stack
- API References
- Recommended modules
- Installation
- Configuration
- Maintainers

## Requirements

This project requires the following dependencies to install:

- React Router DOM (https://www.npmjs.com/package/react-router-dom)
- React (https://www.npmjs.com/package/react)
- Google Maps React (https://www.npmjs.com/package/google-maps-react)
- Google Maps API (https://www.npmjs.com/package/@react-google-maps/api)
- Bootstrap (https://getbootstrap.com/docs/3.4/getting-started/)

## Installation

1. Fork and Clone the repo (git clone https://gitlab.com/north-star-group/north-star-project)
2. Run the following docker commands:
    - obtain Google Maps API key from: https://developers.google.com/maps/documentation/javascript/get-api-key
    - create a .env file in the root of the project
    - add the GOOGLE_API_KEY to the .env file
    - create a unique JWS SIGNING_KEY inside of the .env file
    - docker volume create mongo-data
    - docker compose build
    - docker compose up

## Tech Stack:
- Python
- JavaScript
- React.js
- FastAPI
- Bootstrap
- Docker
- MongoDB
- HTML
- CSS

## API References:
```http://localhost:8000
  GET /api/trips
  GET /api/trips/{trip_id}
  POST /api/trips
  PUT /api/trips/{trip_id}
  DELETE /api/trips/{trip_id}

  GET /api/trips/{trip_id}/events
  GET /api/trips/{trip_id}/events/{event_id}
  GET /api/trips/{trip_id}/itinerary/{date}
  POST /api/trips/{trip_id}/events
  PUT /api/trips/{trip_id}/events/{event_id}
  DELETE /api/trips/{trip_id}/events/{event_id}

  GET /api/location/{location_search}
  ```


## Installation

Install as you would normally install a dependencies using "npm i 'dependency'" by copying the top right text on each website. Here's how if more info is needed: (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Configuration

North Star has no modifiable settings. There is no configuration needed.

## Maintainers

- Braden Towns - https://gitlab.com/bst10a
- Louis Paparella - https://gitlab.com/Pandapanda796959
- Anri Bordone - https://gitlab.com/anri.astora1001
- Khaliq Salako - https://gitlab.com/KhaliqSalako
