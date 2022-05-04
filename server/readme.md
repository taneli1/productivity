## Server folder structure:

### /database

- Contains mapping of the domain models to mongoose schema
- TODO: CRUD operations implemented here instead of graphql services

### /domain

- Defines the data models of the application
- Defines the service interfaces that contain the operations for a model

### /graphql

- Everything related to graphql

## Todo stuff if revisiting

Bugs:

- Task editing, user could pass any project id they own to edit other tasks (even if not owning the project)
- Prob other auth stuff

Improvements:

- Use @ArgsType for inputs etc. + validation
- Better time handling (currently does not consider timezones etc.)
- Cascading deletes on project deletion
- Queries should be moved out of service, have them only call the functions
