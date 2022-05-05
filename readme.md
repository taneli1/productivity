# Productivity

Final project for a backend course, this project is a web application which provides the user the possibility to
track the time they use on a given project.

User can create projects, and add tasks to these projects. When they start working on
a task, they can start the timer for that task. This gives the user the ability to
know how much they are using for different things on a given day.

Data for all the projects is saved in cloud, and the user can view their time usage
for each project.

## Running the project

1. Clone project
2. In ~/server:

- run npm i
- create .env in root, add mongodb url to it
  DB_URL=mongodb://credentials@host
- run server with command: npm run build:dev

3. In ~/client:

- run npm i
- run npm run start

## Server queries/mutations

### Accounts

- Register |
  mutation {
  registerUser(credentials: {
  username: "@",
  password: "@"
  }) {
  \_id
  username
  creationDate
  }
  }

- Login |
  query {
  login(credentials: {
  username: "@",
  password: "@"
  }) {
  \_id
  username
  creationDate
  token
  }
  }

### Projects

- Create a project |
  mutation {
  createProject(data: {
  name: "ProjectName",
  hex: "#2c2c2c"
  }){
  \_id
  userId
  name
  hex
  state
  creationDate
  tasks {
  \_id
  }
  }
  }

- Get user projects |
  query {
  projects {
  \_id
  name
  state
  tasks {
  \_id
  }
  }
  }

- Get project |
  query { project(id: "@") {\_id}}

- Edit project |
  mutation {
  editProject(data: {
  projectId: "@",
  hex: "#ad24dd",
  name: "Edit name",
  state: "ONGOING"
  }) {
  \_id
  }
  }

- Get recently worked on projects |
  query {
  getRecents(limit: 2) {
  \_id
  }
  }

- Delete project |
  mutation { deleteProject(id: "@") {\_id} }

### Tasks

- Create task |
  mutation {
  createTask(data: {
  name: "NewTask",
  projectId: "@",
  }) {
  \_id
  name
  state
  projectId
  entries {
  \_id
  }
  creationTs
  completionTs
  }
  }

- Edit task |
  mutation {
  editTask(data: {
  projectId: "@",
  taskId: "@",
  name: "EditedTask",
  state: "TODO",
  }) {
  \_id
  }
  }

- Project tasks |
  query {
  getProjectTasks(id: "@") {
  \_id
  }
  }

- Delete task |
  mutation {
  deleteTask(
  projectId: "123",
  id: "123") {
  \_id
  }
  }

### Time entries

- Create entry |
  mutation {
  createEntry(data: {
  taskId: "@",
  timeInSeconds: 123
  }) {
  \_id
  userId
  taskId
  createdAt
  timeInSeconds
  }
  }

- Get task entries |
  query {
  getTaskEntries(id: "@") { \_id }
  }

### Overviews

- Total: for a custom time frame |
  query {
  getTimeframeOverview(
  from: 0,
  to: 1991758070,
  ) {
  from
  tasksWithinTimeframe {
  \_id
  }
  to
  tasksCompleted
  totalTimeInSeconds
  }
  }

- Project: for a custom time frame |
  query {
  getProjectOverview(
  from: 0,
  to: 1991758070,
  projectId: "@"
  ) {
  from
  tasksWithinTimeframe {
  \_id
  }
  to
  tasksCompleted
  totalTimeInSeconds
  }
  }

## A few notes to self if revisiting the project

- Contains unefficient solutions for alot of things. For example, state management in client app is
  done with hooks, and most of them were scoped to pages. This lead to a few issues with the UI not
  being kept up to date on all data, and a bandaid fix has been implemented to handle these cases.
  (see contextWrapper.tsx)

- Client side queries could be optimized (+ used in refresh queries with new state management).

- Improvements should be done on the server side as well (moving the data management
  out of graphql services, bugfixes, proper deletion of stuff, proper input validation).
