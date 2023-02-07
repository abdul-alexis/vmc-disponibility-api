const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../bd/sequelize')
const user = require('../controllers/controller-user');
const authenticated = require('../middlewares/authenticated');
const isAdmin = require('../middlewares/isAdmin');


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the User
 *         email:
 *           type: string
 *           description: The User email
 *         password:
 *           type: string
 *           description: The User password
 *         isAdmin:
 *           type: boolean
 *           description: The User access nivel
 *       example:
 *         id: 6
 *         email: teste@teste.com
 *         isAdmin: false
 *         password: Api#1234
 *     Token:
 *       type: object
 *       properties:
 *         token:
 *              type: string
 *              description: The User token access
 *       example:
 *         token: wghlwklbnghjkdGSDMNSbdjsdjs.DSjadjbjdbhbaszddbddabd.Sgdajgd
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: The User managing API
  */

 /**
 * @swagger
 * /api/login:
  *   post:
 *     summary: Returns the user token access
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The token access of the User
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *        description: The request not authorized
 *        content:
 *         plain/text:
 *           schema:
 *             type: string
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send('Usuário ou senha inválidos');
        } else {
            let success = await bcrypt.compare(password, user.hash);
            if (success) {
                const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
                return res.json({ token });
            } else return res.status(400).json("Senha incorreta!");
        }

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }

});



/**
 * @swagger
 * /api/user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns the list of all the Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *        description: The request not authorized
 *        content:
 *         plain/text:
 *           schema:
 *             type: string
 */
router.get('/user', authenticated, isAdmin, user.getAllUsers);
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/user/:id', authenticated, isAdmin,user.getById);
/**
 * @swagger
 * /api/user:
  *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/user', authenticated, isAdmin, user.save);
/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *    security:
 *       - bearerAuth: []
 *    summary: Update the user by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put('/user/:id', authenticated, isAdmin, user.update);
/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router.delete('/user/:id',authenticated, isAdmin, user.delete);

module.exports = router;
