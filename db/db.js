const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  });
  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error(error);
    process.exit(1);
  });
  db.once('open', () => {
    console.log('Connected to MongoDB database');
});