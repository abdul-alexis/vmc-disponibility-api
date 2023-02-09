const bcrypt = require('bcrypt');
const { User } = require('../bd/sequelize')
const { Op } = require('sequelize');

//listar usuario
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//get usuario by id
exports.getById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(user) return res.json(user);
        return res.status(404).json("Não encontrado")
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//Fazer o cadastro do usuario
exports.save = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        const finded = await User.findOne({ where: { email: email } });
        if (!finded) {
            let hash = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, hash });
            return res.status(201).json(user);
        }
        return res.status(409).send({ mensagen: "Usuário já cadastrado!" })

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//atualizar o usuario
exports.update = async (req, res) => {
    try {
        let { name, email, isAdmin } = req.body;
        const [updated] = await User.update({ name, email, isAdmin }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const user = await User.findByPk(req.params.id);
            res.json(user);
        } else {
            res.status(404).send('Usuário não encontrado');
        }

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//atualizar senha o usuario
exports.updatePassword = async (req, res) => {
    try {
        let { password } = req.body;
        let hash = await bcrypt.hash(password, 10);
        const [updated] = await User.update({ hash }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const user = await User.findByPk(req.params.id);
            res.json(user);
        } else {
            res.status(404).send('Usuário não encontrado');
        }

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}
//deletar o usuario
exports.delete = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.send('Usuário excluído com sucesso');
        } else {
            res.status(404).send('Usuário não encontrado');
        }

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}
