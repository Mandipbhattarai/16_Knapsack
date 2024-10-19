import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import { apiLogger } from "./middleware";
import subscribeRouter from "./routes/subscribe";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(apiLogger);
app.use("/user", userRouter);
app.use("/subscribe", subscribeRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
