This project is a technical test for the GEOPTIS society. 

In this document, I will provide some intel about how or why this project has been created the way it is at the moment.


This project will be divided in three main tasks.

First thing to do will be to create the restaurant database with PostgreSQL in order to ensure that the CHECK constraint for the latitude and longitude are respected, even if the API fail. This way, the double check ensure the correct behavior.

The logical consequence to the database creation is to build a minimal backend with the requested endpoint. To make things easier at the beginning, those endpoints will be static, then we can change to something responsive with the database as the tests go. 
The endpoints will be the following, as requested:
o POST /api/restaurants - Adding a new restaurant
o GET /api/restaurants - listing all the restaurants
o GET /api/restaurants/search?q=term - Searching for restaurants
o GET /api/restaurants/filter?cuisine=type - Filter by cuisine type.

Alongside the creation of the latter endpoints, the backend must be implemented so it respects the rules requested by the test: the field length, the bounds for latitude and longitude...
This way, we ensure that even though we send data through the frontend  we shouldn't, the API still send us the correct answer. The error feedback from the API will have a lot of value for this project.

Finally, the frontend will be the last task, as it is the easiest thing to implement when the API is well-defined. In the end, all I'll have to do is to implement the table, the display for the restaurant list and the filters and search bar.
