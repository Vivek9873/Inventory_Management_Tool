

const express = require("express")
const {addProductController,updateProductController,getProductController} = require("../controller/product-controller");
const authMiddleware = require("../middleware/user-middleware");

const router = express.Router();


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - sku
 *               - quantity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               sku:
 *                 type: string
 *               image_url:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Failed to add product
 */
router.post("/",authMiddleware,addProductController);


/**
 * @swagger
 * /products/{id}/quantity:
 *   put:
 *     summary: Update quantity of a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product quantity updated
 *       404:
 *         description: Product not found
 */
router.put("/:id/quantity",authMiddleware,updateProductController);


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with pagination and sorting
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: "Page number (default: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: "Items per page (default: 4)"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description:"Field to sort by (default: price)"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: "Sort order (default: desc)"
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/",authMiddleware,getProductController);


module.exports = router;
