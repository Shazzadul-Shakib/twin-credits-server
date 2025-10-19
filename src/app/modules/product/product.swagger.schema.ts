/**
 * @swagger
 * components:
 *   schemas:
 *     GetProductsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Products retrieved successfully"
 *         statusCode:
 *           type: integer
 *           example: 200
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "68f347d5c70c14f2b479f004"
 *               name:
 *                 type: string
 *                 example: "Premium Plan"
 *               description:
 *                 type: string
 *                 example: "Unlock all premium features"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               credits:
 *                 type: integer
 *                 example: 100
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-18T07:55:01.248Z"
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-10-18T07:55:01.248Z"
 *     GetProductsErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Failed to retrieve products"
 *         statusCode:
 *           type: integer
 *           example: 500
 *         error:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 example: ""
 *               message:
 *                 type: string
 *                 example: "Internal server error"
 */
