# LINKAVET REST API
Rentals REST API with nodejs, express, and Postgres DB

It contains the following modules;
- infrasctructure
- domain
- data
- presentation

#### DATA
It contains the following modules;
- entities
- repositories
    Divided into ***Impl*** | ***Contacts***

#### DOMAIN
- models
- usecases

#### INSFRASTRUCTURE
- other services like cloudinary, etc
- database
#### PRESENTATION LAYER
- controllers
- routes
- dtos
- mappers
- validators
#### TESTS
unit test files
## INSTRUCTIONS ON HOW TO SETUP THE PROJECT
- clone the repository
- create ***.env*** file to configure the following environmental variables
```
    PORT=PORT_NUMBER

    # database parameters
    DB_USERNAME=DB_USERNAME
    DB_PASSWORD=DB_PASSWORD
    DB=DATABASE
    DB_PORT=DB_PORT
    HOST=localhost
    DIALECT=postgres
```
replace the following configurations with your own local development settings.

### SETUP DATABASE AND GENERATE INITIAL MIGRATIONS
- Run the commands simultanously
*****
`npm run db:create`
    To create the database from the `db/config.json`
*****
`npm run migration:gen`
    To generate migration from `/data/entities/`
*****
`npm run migrate:up`
To effect generate migrations
*****
`npm run migrate:undo` 
    If you need undo previous migrations
*****
<!-- Validation -->
```npm install class-validator class-transformer```
// add price and discount to course 
convert long forms to step forms

