<h1>Backend Analyst Candidate Testing</h1>
<h2>Luan Bodner do Rosário</h2>

<strong>Running the project</strong>

- Enter the project folder;
- Switch to branch <i>feat/products</i>;
- Install dependencies (<i>yarn install</i> or equivalent);
- Stop all services running on port 5432 (if it's the postgres database run <i>sudo service postgresql stop</i> );
- Run the project with the command <i>yarn docker-run</i>;
- Run the necessary migrations with <i>yarn migrate</i>.

<strong>Running the tests</strong>

- Enter the project folder;
- Switch to branch <i>feat/products</i>;
- Install dependencies (<i>yarn install</i> or equivalent);
- Check the environment file for the database connection specification. Ideally, these tests run on the development(local) environment;
- Create a local database to match and run <i>yarn migrate</i>;
- Run the jest environment with <i>yarn test</i>.

The API documentation can be found clicking this <a href='https://documenter.getpostman.com/view/5612863/Uz5CLxjG'>link</a>.

<strong>Observations</strong>

- Environment files (.env) are not supposed to be versioned, but i left it here just to make it easier to run the tests and create the database migrations in other machines.
- There are 3 default categories created just so they can be potentially used for manual tests and the jest environment. The following ids represent valid categories: 1,2 and 3.
