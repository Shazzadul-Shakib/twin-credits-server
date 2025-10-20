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
 *     parameters:
 *       - $ref: '#/components/parameters/status'
 *       - $ref: '#/components/parameters/sortBy'
 *       - $ref: '#/components/parameters/sortOrder'
 *       - $ref: '#/components/parameters/page'
 *     responses:
 *       200:
 *         description: A list of referred users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReferredUser'
 */
