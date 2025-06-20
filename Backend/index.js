const express = require("express");
const path = require('path');
const { connection } = require("./db");
const { driverroute } = require("../../tech-sankat-nivaaran-4321-main/backend/routes/driver.routes");
const { userRouter } = require("../../tech-sankat-nivaaran-4321-main/backend/routes/user.route");
const { cardataRouter } = require("../../tech-sankat-nivaaran-4321-main/backend/routes/cardata.route");

const { analysisRouter } = require("../../tech-sankat-nivaaran-4321-main/backend/routes/analysis")

const {blogroute}=require("../../tech-sankat-nivaaran-4321-main/backend/routes/blog.routes")

const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
// multer
app.use('frontend/uploads/', express.static(path.join(__dirname, 'uploads')));



//middlewares
app.use(cors());
app.use(express.json());

// swagger UI
// my requirements
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RiderX APIs",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
      {
        url: "https://tech-sankat-nivaaran-4321.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
// building OpenApi Specifications
const openApiSpec = swaggerJsDoc(options);

//Building complete UI
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

//routes
app.use("/driver", driverroute);
app.use("/carData", cardataRouter);
app.use("/users", userRouter);

app.use("/analysis", analysisRouter);

app.use("/blog", blogroute);


// connecting to server and DB
app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log("Server Started");
  } catch (error) {
    console.log(error);
  }
});