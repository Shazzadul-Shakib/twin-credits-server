/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "User already exist with this email!"
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
 *                 example: "email"
 *               message:
 *                 type: string
 *                 example: "User already exist with this email!"
 *     UserResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "User registered successfully"
 *         statusCode:
 *           type: integer
 *           example: 200
 *         data:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "68f347d5c70c14f2b479f004"
 *             name:
 *               type: string
 *               example: "Shakib"
 *             email:
 *               type: string
 *               example: "shakib11@gm.com"
 *             password:
 *               type: string
 *               example: "$2b$09$OS5daoMoswW4KT6wCnDtv.4JR.Pf8TQli0Q4pvxS0a5/kOgCdD9zS"
 *             referralCode:
 *               type: string
 *               example: "SHAKIB2CEB"
 *             credits:
 *               type: number
 *               example: 0
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-18T07:55:01.248Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-10-18T07:55:01.248Z"
 *             __v:
 *               type: integer
 *               example: 0
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: Astro
 *         email:
 *           type: string
 *           example: astro@example.com
 *         password:
 *           type: string
 *           example: "StrongPass123!"
 */
