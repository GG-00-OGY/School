const app = require('./app');
const connectToDatabase = require('./Config/db');


async function startServer() {
  try {
    await connectToDatabase();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error('server not runnig!!!!!!!', err);
    process.exit(1);
  }
}

startServer();
