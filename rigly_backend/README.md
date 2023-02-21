# rigly_final_backend

# Django + Postgres

### Virtual Environment 

Assumes you have python3...

1. Fork the repo on github to get a copy of the respository, and then cloned that newly forked repo with `git clone`
2. Create a virtual environment with the  `python -m venv venv` .This will an environment called "venv" that helps with controlling dependencies.
3. Activate the environment with `source venv/bin/activate`
4. Install all the application's dependencies (while in the activated virtual environment) with `pip install -r requirements.txt`.

### Database

Since we want to use postgres as our production database, we should make sure that any local development is also done with postgres. Setting postgres up to run on a machine locally is more of a hassle than the default 'db.sqlite3' database that django, but using it locally ensures that no weird errors crop up by having different database implementations across environments development and production environments.

##### Note
A point can be made that once a production database is established, it's easier to develop locally, but make external requests to the production database. While this might make sense for a bit, there will come a point when the production database is sacred, and the threat of potentially wrecking it in some fashion with local development is too great. Working locally with postgres gives a nice sandboxed database that be destroyed and recreated at will. 

### To Setup up Postgres Locally on a Mac

1. Install [homebrew](https://brew.sh/) if it's not already on your Mac.
2. Update brew with `brew update`.
3. Install postgres with `brew install postgres`.
4. To start postgres consistently run in the background, use the command `brew services start postgresql`. If you'd prefer to start it manually and not have it automatically start use `pg_ctl -D /usr/local/var/postgres start`.
5. Make sure that everything is working properly by entering postgres's command line interface with `psql postgres`. You should see you enter a shell that looks like `postgres=#`.
6. Once in the interface, create a new database named auctions with the command `CREATE DATABASE auctions;` If creating the database succeeds, you will see the response `CREATE DATABASE`. This will be the database that our django application will connect and write to for local development. 
7. For anyone to connect and access the database we created, they need a valid postgres username and password combination. This means that we need to create a dedicated user for django to interact with our new database. We create it with  `CREATE USER admin WITH PASSWORD '021198dD@';` 
8. Our new postgres user needs explicit permission to have read and write capabilities on our newly created database. We can do that with the command 
`ALTER ROLE admin SET client_encoding TO 'utf8';`

`ALTER ROLE admin SET timezone TO 'UTC';`
`GRANT ALL PRIVILEGES ON DATABASE "auctions" to admin;` 
9. Exit out of postgres with comand `\q`



### Run API Locally

If everything has gone according to plan, only 3 steps are need to needed to run the server in its current state.

1. Run `python manage.py makemigrations` to see how/if old data can be translated to a newer representation.
2. Run `python manage.py migrate` actually translate the database to the most up to date representation
3. Run `python manage.py runsslserver` simply starts the server on localhost, It will throw a certification warnings you can ignore them. Server needs to run on https for auth0.


### Create super user

Run command `python manage.py createsuperuser`

Then go to `https://127.0.0.1:8000/admin` and login with same details as written in above command. You can add data to auction list, collection and homepage data model in order to show data on react app.
