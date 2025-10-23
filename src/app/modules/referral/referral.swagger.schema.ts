/**
 * Swagger schema definitions for referral endpoints
 */

/**
 * @swagger
 * components:
 *   parameters:
 *     status:
 *       in: query
 *       name: status
 *       schema:
 *         type: string
 *       description: Filter by referral status (pending, completed)
 *     sortBy:
 *       in: query
 *       name: sortBy
 *       schema:
 *         type: string
 *         example: createdAt
 *       description: Field to sort by
 *     sortOrder:
 *       in: query
 *       name: sortOrder
 *       schema:
 *         type: string
 *         enum: [asc, desc]
 *       description: Sort order
 *     page:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         default: 1
 *       description: Page number
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
 *                 type: object
 *                 description: Details of the referred user
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the referred user
 *                     example: "68f336a8751f9f9dc3f80750"
 *                   name:
 *                     type: string
 *                     description: Name of the referred user
 *                     example: "Shakib"
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
 *         metadata:
 *           type: object
 *           description: Metadata about the referral list
 *           properties:
 *             totalCount:
 *               type: integer
 *               description: Total number of referrals
 *               example: 2
 *             pendingCount:
 *               type: integer
 *               description: Number of pending referrals
 *               example: 2
 *             completedCount:
 *               type: integer
 *               description: Number of completed referrals
 *               example: 0
 *             limit:
 *               type: integer
 *               description: Items per page
 *               example: 5
 *             page:
 *               type: integer
 *               description: Current page number
 *               example: 1
 */
