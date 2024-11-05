const userRouter = require('./src/routers/user/user-router');
const Application = require('./src/services/application');
const jsonParser = require('./src/services/middlewares/parseJson');
const parseUrl = require('./src/services/middlewares/parseUrl');

const mongoose = require('mongoose');

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:12345@test-cluster.omzln.mongodb.net/?retryWrites=true&w=majority&appName=Test-cluster');
  } catch (e) {
    console.log('Error MONGOOSE', e);
  }
};

port = 5078;

const app = new Application();

app.use(jsonParser);
app.use(parseUrl('http://localhost:5000'));

app.addRouter(userRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));

start();
