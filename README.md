# 🚀 Rigly Auctions

Our legacy frontend codebase is located in the `rigly_frontend_javascript` folder. The new Next.js app is located in `auction-ui`.
The plan is to gradually move over logic from the legacy codebase to the new codebase and then deprecate the legacy codebase.

## Debugging locally
You have two ways of running this project locally.

### Docker
1. Create an `.env` file in `/auction-ui`. Use the `.env.example` to get a sense of what env vars you need to set. 
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
