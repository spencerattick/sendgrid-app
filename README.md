# Sendgrid Comms App
This purpose of this application is to be able to send proactive communications out to customers in the event of a SEV. This tool will generally be used by the Product Tech Leads of the Success Engineering team in conjunction with the team managing the SEV.

With this tool, you can upload a CSV of user email and dynamic content (workspace slugs, source slugs, etc.) and visualize how communications will look through a Sendgrid email template. This will give more visibility and make the comms process much easier than the Node script that was used for this task previously.

The inputs the UI asks for are as follows:

- __Sendgrid API Key__ : This can be found in 1Password.
- __Template ID__ : This can be found in the Sendgrid UI per [these instructions](https://paper.dropbox.com/doc/Incident-Management-Guide-V2.0--BcCQZ3KYVBVY~74v5hv7tIKqAg-BkVqTwAXojw5kl2BjYYqA#:uid=659570942660629845572049&h2=How-to-send-Comms).
- __CSV File__ : This should be a file of per [these instructions](https://paper.dropbox.com/doc/Incident-Management-Guide-V2.0--BcCQZ3KYVBVY~74v5hv7tIKqAg-BkVqTwAXojw5kl2BjYYqA#:h2=Part-2:-Node.js-Script).

The buttons operate as follows:

- __Preview Message__ : This button uses the Sendgrid API Key, the Template ID, and the CSV to surface an example of what the outgoing email will look like. It uses the data from the first row of the CSV to preview an example.
- __Upload Email__ : This button doesn't work yet but will actually send emails in terms of the data provided in the CSV.

## Local Setup
This app was built with a create-react-app template so it is very easy to get setup with. Please go ahead and follow the steps below:

1. Clone the repo onto your machine:

`$ git clone https://github.com/spencerattick/sendgrid-app.git`

2. Add the necessary packages:

`$ cd sendgrid-app`

`$ npm install`

3. Start the app:

`$ npm start`

4. In a separate terminal tab, start the server:

`$ node server.js`

## Contributing
Please feel welcome to contribute to this project! There are a [list of open to-dos here](https://trello.com/invite/b/3O6rnu7f/9973ee0cd8484ff49849562b7e2c332d/sendgrid-app). The organization is as follows:

green = backend work

yellow = general work

purple = frontend work

Go ahead and assign a task to yourself and move it from the __To Dos__ list to the __In Progress__ list.

Feel free to add new items to the __To Dos__ list as you see them.

When pushing up new changes please ensure the following:

1. you're on a separate branch
2. you create a pull request rather than committing directly to the codebase
3. your pull request includes at least one passing test for backend tasks
4. you've run an end-to-end test that shows no functionality was negatively impacted

When writing a pull request please make sure it's as descriptive as possible.

## Testing

The current test file can be found at `./test/index_test.js`.

To run the test suite, use `$ npm test` when you're in the root of the project.

When making a pull request for backend work, please ensure you've included at least one new test to accompany your code change.

If you're unfamiliar with [Mocha](https://mochajs.org/) as a testing tool, here is a [great course where you can get an introduction](https://www.codecademy.com/learn/learn-javascript-unit-testing).
