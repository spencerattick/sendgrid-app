# Sendgrid Comms App
This purpose of this application is to be able to send proactive communications out to customers in the event of a SEV. This tool will generally be used by the Product Tech Leads of the Success Engineering team in conjunction with the team managing the SEV.

With this tool, you can upload a CSV of user email and dynamic content (workspace slugs, source slugs, etc.) and visualize how communications will look through a Sendgrid email template. This will give more visibility and make the comms process much easier than the Node script that was used for this task previously.

## Local Setup
This app was built with a create-react-app template so it is very easy to get setup with. Please go ahead and follow the steps below:

1. Clone the repo onto your machine:

`$ git clone https://github.com/spencerattick/sendgrid-app.git`

2. Add the necessary packages:

`cd sendgrid-app`
`npm install`

3. Start the server:

`npm start`

## Contributing
Please feel welcome to contribute to this project! There are a [list of open to-dos here](https://trello.com/b/3O6rnu7f/sendgrid-app). The organization is as follows:

green = backend work
yellow = general work
purple = frontend work

Go ahead and assign a task to yourself and move it from the __To Dos__ list to the __In Progress__ list.

When pushing up new changes please ensure the following:

1. you're on a separate branch
2. you create a Pull Request rather than committing directly to the codebase
3. your Pull Request includes at least one passing test for backend tasks

When writing a Pull Request please make sure it's as descriptive as possible.

## Testing

This section is TBD as my next step is to add testing to the project.
