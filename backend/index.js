require("dotenv").config(); //9

const PORT = process.env.PORT || 4000;

const app = require("./app");

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
