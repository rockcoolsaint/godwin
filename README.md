# 🚀 Rigly Auctions

Our legacy frontend codebase is located in the `rigly_frontend_javascript` folder. The new Next.js app is located in `auction-ui`.
The plan is to gradually move over logic from the legacy codebase to the new codebase and then deprecate the legacy codebase.

## Rigly.io

The PRODUCTION app is hosted at [rigly.io](https://rigly.io) 

Demo App
-
The demo/test version of the app is hosted here -> [QA](https://qa.auctions.rigly.io/)


## Running Locally

If you want to run Rigly auctions on your local machine you can follow these steps:

1. Clone the repository
```
git clone https://github.com/RiglyCorp/rigly-auction.git
```
2. cd into the new directory
```
cd rigly-auction
```
3. run `yarn` to install the packages
4. Add environment variables - create a `.env` file, you can copy the `.env.example` (reach out on slack to confirm your env looks good)
5. run `yarn run dev` and the app will be served on `localhost:3000`


## Debugging locally
You have two ways of running this project locally.

### Docker
1. Create an `.env` file in `/auction-ui`. Use the `.env.example` to get a sense of what env vars you need to set. Note you may need additional variables here for Auth0, api keys, etc.
2. In the root folder, run `docker compose up`. This should start the Next.js dev server app on port `3000`.
3. Happy debugging!

### Pre steps (on Mac)

You will need to install docker and possibly docker-compose.

1. https://docs.docker.com/desktop/install/mac-install/
1. brew install docker-compose
1. then in the root folder, run `docker-compose up` (note the hyphen)

### Manual
1. Create an `.env` file in `/auction-ui`. Use the `.env.example` to get a sense of what env vars you need to set. 
2. Run `yarn` or `yarn install` inside the `/auction-ui` folder.
3. Run `yarn dev`. This should start the Next.jsj dev server on port `3000`.
4. Happy debugging!
