const express = require('express');
const router = express.Router();
const status = require('../controllers/controller-status');
const authenticated = require('../middlewares/authenticated');
/**
 * @swagger
 * components:
 *   schemas:
 *     Status:
 *       type: object
 *       properties:
 *         uptime:
 *              type: string
 *              description: The period sbc server alive
 *       example:
 *         token: 2 dias, 21:30:38
 */

 /**
  * @swagger
  * tags:
  *   name: Status
  *   description: The Status managing API
  */

 /**
 * @swagger
 * /api/status:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns the sbc server status
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: The token access of the Status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Status'
 *       401:
 *        description: The request not authorized
 *        content:
 *         plain/text:
 *           schema:
 *             type: string
 */
router.get('/',authenticated, status.getStatus);



module.exports = router;