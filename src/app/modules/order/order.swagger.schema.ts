/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOrderRequest:
 *       type: object
 *       required:
 *         - product
 *       properties:
 *         product:
 *           type: string
 *           description: ID of the product to order
 *           example: "68f4800c4e3bad7d576af91a"
 *     CreateOrderResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Order created successfully"
 *         statusCode:
 *           type: integer
 *           example: 200
 *         data:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               example: "68f3341520f934fb166bba03"
 *             product:
 *               type: string
 *               example: "68f4800c4e3bad7d576af91a"
 *             _id:
 *               type: string
 *               example: "68f4c8713d485a43577a6c81"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-19T11:16:01.415Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-19T11:16:01.415Z"
 *             __v:
 *               type: integer
 *               example: 0
 *     CreateOrderErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Product not found or out of stock!"
 *         statusCode:
 *           type: integer
 *           example: 400
 *         error:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 example: "product"
 *               message:
 *                 type: string
 *                 example: "Product not found or out of stock!"
 */
