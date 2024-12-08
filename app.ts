
import express from 'express';
import category from "./src/routes/category"
import auth from "./src/routes/auth"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Routes setup
app.use('/api/auth', auth)
app.use('/api/category', category)


// Start server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

export default app;
