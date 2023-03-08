# Module3 Project Gamma

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

- Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

- [ ] Wire-frame diagrams
- [ ] API documentation
- [ ] Project is deployed to Render.com/GitLab-pages
- [ ] GitLab issue board is setup and in use
- [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `sample_service`, are
sample services, that you can start building off of or use
as a reference point.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `sample_service` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `sample_service` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The sample Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

- `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
- `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to Render.com. We will learn much more about this file.
- `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

- make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
- remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

- add these GitLab CI/CD variables:
  - PUBLIC_URL : this is your gitlab pages URL
  - SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Create render.com account and application

- create account on render.com
- one person create a group and invite all other members
- create a new "Web Service"
  - authenticate with GitLab and choose your project
  - Enter fields:
    - Name: name of your service
    - Root Directory: the directory of your service in your git repo.
      For this example use "sample_service".
    - Environment: Docker
    - Plan Type: Free
  - click the "Create Web Service" button to create it
  - the build will succeed and it will look like the server is running,
    most likely, in 6-10 minutes, it will fail.
  - click "Manual Deploy" -> "Deploy latest commit" and the service
    should deploy successfully.

### Update GitLab CI/CD variables

Copy the service URL for your new render.com service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.

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
- Troubleshooting
- FAQ
- Maintainers

## Requirements

This project requires the following modules and dependencies (npm):

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
