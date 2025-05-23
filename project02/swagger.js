const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Books & Authors API",
    description: "REST API for managing books and authors collections",
  },
  host: "localhost:3000",
  schemes: ["http"],

  tags: [
    {
      name: "books",
      description: "Books endpoints",
    },
    {
      name: "authors",
      description: "Authors endpoints",
    },
  ],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
