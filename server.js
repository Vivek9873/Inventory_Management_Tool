require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const userRouter = require("./routes/user-routes");
const productRouter = require("./routes/product-routes");
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");

connectToDB();

const app = express();
const PORT=process.env.PORT;


app.use(express.json());

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Inventory Management Tool",
            version:"1.0.0"
        },
        servers:[
            {
                url: `http://localhost:${PORT}/`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis:['./routes/user-routes.js','./routes/product-routes.js']
}
const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use("/",userRouter);
app.use("/products",productRouter);


app.listen(PORT,()=>{
    console.log(`Server is now running at http://localhost:${PORT}`);
})

