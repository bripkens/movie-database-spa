# movie-database [![Build Status](https://secure.travis-ci.org/bripkens/movie-database-spa.png)](https://travis-ci.org/bripkens/movie-database-spa)

This project shows how the movie-database web frontend could be developed as a Single-Page Application. The application has been deployed to Heroku. [Give it a try!](http://movie-database-spa.herokuapp.com/movies)


*Please note: Heroku is shutting down the app from time to time to save resources. Initial loading times may therefore be slow.*

## System Requirements

You need to have the following applications installed in order to *build* and *run* this application.

* node.js (Tested with 0.8.x. Version 0.10.x is known to be break the server task)
* npm (should be installed automatically with node.js)
* [grunt](https://github.com/gruntjs/grunt)
* a running version of the [ROCA version of this application](https://github.com/tobiasflohre/movie-database) (see the following section for more information)

## Configuration
This application depends on the web services of the ROCA version of the [movie-database](https://github.com/tobiasflohre/movie-database). Therefore you will also need to run the ROCA version and, depending on the way you configured it, update the configuration of this application. To do so, simply update the *endpoint* configuration option in ```src/js/config.js```.
    
## Build and Run
Install development dependencies:
    ```npm install```

Build and run the application:
    ```grunt run```

Access the application in your browser: [http://localhost:8000](http://localhost:8000)
