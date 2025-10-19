/**
 * @swagger
 * tags:
 *   name: Referral
 *   description: Referral management
 */

/**
 * @swagger
 * /referral/referred-users:
 *   get:
 *     summary: Get all referred users
 *     tags: [Referral]
 *     responses:
 *       200:
 *         description: A list of referred users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReferredUser'
 */