/**
 * Swagger schema definitions for referral endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReferredUser:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Referred users retrieved successfully"
 *         statusCode:
 *           type: integer
 *           example: 200
 *         data:
 *           type: array
 *           description: List of referred users
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: Unique identifier of the referral record
 *                 example: "68f336a8751f9f9dc3f80752"
 *               referrerId:
 *                 type: string
 *                 description: ID of the user who made the referral
 *                 example: "68f33693751f9f9dc3f8074c"
 *               referredId:
 *                 type: string
 *                 description: ID of the user who was referred
 *                 example: "68f336a8751f9f9dc3f80750"
 *               status:
 *                 type: string
 *                 description: Current status of the referral
 *                 enum: [pending, completed, rejected]
 *                 example: "pending"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp when the referral was created
 *                 example: "2025-10-18T06:41:44.761Z"
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp when the referral was last updated
 *                 example: "2025-10-18T06:41:44.761Z"
 *               __v:
 *                 type: integer
 *                 description: Version key for MongoDB document
 *                 example: 0
 */
