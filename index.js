const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const userRoutes = require("./routes/userRoutes");
const threadRoutes = require("./routes/threadRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes")

const app = express();

app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  name: 'creddit-user-token',
  cookie: { secure: false, maxAge: 600000000 }
}));

const cors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if (req.method === 'OPTIONS') {
      return res.status(200).end()
  }

  next()
}

app.use(cors)

app.use("/api/user", userRoutes);
app.use("/api/thread", threadRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.2oxxltl.mongodb.net/?retryWrites=true&w=majority"
  );
};
main()
  .then(() => {
    app.listen(3001, () => {
      console.log("Listening on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
