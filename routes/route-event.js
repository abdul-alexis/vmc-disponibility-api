const express = require('express');
const router = express.Router();
const event = require('../controllers/controller-event');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');



/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - startDate
 *         - endDate
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the Event
 *         title:
 *           type: string
 *           description: The Event title
 *         startDate:
 *           type: string
 *           description: The Event startDate
 *         endDate:
 *           type: string
 *           description: The Event endDate
 *         description:
 *           type: string
 *           description: The Event description
 *       example:
 *         id: 67
 *         title: Atualização do servidor
 *         starDate: 2022-12-31T21:00:00
 *         endDate: 2022-12-31T21:30:15
 *         descrition: O servidor foi parado para fazer atualização de segurança porém subimos um backup para manter o serviço ativo.
 *     Token:
 *       type: object
 *       properties:
 *         token:
 *              type: string
 *              description: The Event token access
 *       example:
 *         token: wghlwklbnghjkdGSDMNSbdjsdjs.DSjadjbjdbhbaszddbddabd.Sgdajgd
 */

 /**
  * @swagger
  * tags:
  *   name: Event
  *   description: The Event managing API
  */

 /**
 * @swagger
 * /api/event:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns the list of all the Events
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: The list of the Events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       401:
 *        description: The request not authorized
 *        content:
 *         plain/text:
 *           schema:
 *             type: string
 */
router.get('/',authenticated,event.getAllEvent);
router.get('/byDate',authenticated, event.getEventByDate);
router.get('/byStartEventDate',authenticated,event.getByStartEventDate);
router.get('/byEndEventDate',authenticated,event.getByEndEventDate);
/**
 * @swagger
 * /api/event/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the event by id
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The event id
 *     responses:
 *       200:
 *         description: The event description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: The event was not found
 */
router.get('/:id',authenticated,event.getById);
/**
 * @swagger
 * /api/event:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: The event was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       500:
 *         description: Some server error
 */
router.post('/',authenticated,isAdmin,event.save);
/**
 * @swagger
 * /api/event/{id}:
 *  put:
 *    security:
 *       - bearerAuth: []
 *    summary: Update the event by the id
 *    tags: [Event]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The event id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Event'
 *    responses:
 *      200:
 *        description: The event was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Event'
 *      404:
 *        description: The event was not found
 *      500:
 *        description: Some error happened
 */

router.put('/:id',authenticated,isAdmin,event.update);
/**
 * @swagger
 * /api/event/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the event by id
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 * 
 *     responses:
 *       200:
 *         description: The event was deleted
 *       404:
 *         description: The event was not found
 */
router.delete('/:id',authenticated,isAdmin,event.delete);



module.exports = router;