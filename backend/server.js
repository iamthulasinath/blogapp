require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

mongoose
  .connect(process.env.MONGO_URI || "your-fallback-uri", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("DB connection error:", error.message));

app.get("/", (req, res) => {
  res.send("Hello Venkat");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
