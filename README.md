# Mini Microservices App

This App is built with Node JS and React as the frontend to mimic a microservice architecture. Data is not perceived to a database.
Services

- Posts service to create and receive posts
- Comments service to create and receive comments
- Query service to record posts and their respected comments
- Moderation service to modify comment status

## Learnings

- Creating a minimal version of event bus from scratch
- Serving up data using a query service
- Synchronizing different services running at the same time
- Persisting events to account for missing events when services go down
