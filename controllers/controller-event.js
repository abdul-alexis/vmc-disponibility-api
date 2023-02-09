const bcrypt = require('bcrypt');
const { parse, stringify, toJSON, fromJSON } = require('flatted');
const { Event } = require('../bd/sequelize');
const { Op } = require('sequelize');

const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
//retornar todos os eventos
exports.getAllEvent = async (req, res) => {
    try {

        const datas = await Event.findAll({
            attributes: ['id', 'title', 'startDate', 'endDate', 'description']
        });
        let events=datas.map((event)=>{
            return{
                id:event.id,
                title:event.title,
                startDate:event.startDate.toLocaleString(),
                endDate:event.endDate.toLocaleString(),
                description:event.description
            }
        })
        return res.json({ events });

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(404).send({ error })
    }
}

exports.getEventByDate = async (req, res) => {
    let { before, after, equal, initial, final } = req.query

    try {
        if (initial && final) {
            if (regex.test(initial) && regex.test(final)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {
                        [Op.or]: [
                            {
                                startDate: {
                                    [Op.gte]: new Date(initial),
                                    [Op.lt]: new Date(final)
                                }
                            }
                            ,
                            {
                                endDate: {
                                    [Op.gte]: new Date(initial),
                                    [Op.lt]: new Date(final)
                                }
                            }
                        ]
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }
        if (before) {
            if (regex.test(before)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {
                        [Op.or]: [
                            {
                                startDate: {
                                    [Op.lt]: new Date(before)
                                }
                            }
                            ,
                            {
                                endDate: {
                                    [Op.lt]: new Date(before)
                                }
                            }
                        ]
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }
        if (after) {
            if (regex.test(after)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {
                        [Op.or]: [
                            {
                                startDate: {
                                    [Op.gt]: new Date(after)
                                }
                            }
                            ,
                            {
                                endDate: {
                                    [Op.gt]: new Date(after)
                                }
                            }
                        ]
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }

        if (equal) {
            if (regex.test(equal)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {
                        [Op.or]: [
                            {
                                startDate: {
                                    [Op.eq]: new Date(equal)
                                }
                            }
                            ,
                            {
                                endDate: {
                                    [Op.eq]: new Date(equal)
                                }
                            }
                        ]
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }
        return res.status(404).send({ text: 'Não encontrado' })

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(400).send({ error })
    }
}


exports.getByStartEventDate = async (req, res) => {
    let { before, after, equal, initial, final } = req.query;
    try {
        if (initial && final) {
            if (regex.test(initial) && regex.test(final)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {

                        startDate: {
                            [Op.gte]: new Date(initial),
                            [Op.lt]: new Date(final)
                        }
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });

        }
        if (before) {
            if (regex.test(before)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {
                        startDate: {
                            [Op.lt]: new Date(before)
                        }
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }
        if (after) {
            if (regex.test(after)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {
                        startDate: {
                            [Op.gt]: new Date(after)
                        }
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }

        if (equal) {
            if (regex.test(equal)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {
                        startDate: {
                            [Op.eq]: new Date(equal)
                        }
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }
        return res.status(404).send({ text: 'Não encontrado!' })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(400).send({ error })
    }
}

exports.getByEndEventDate = async (req, res) => {
    let { before, after, equal, initial, final } = req.query

    try {
        if (initial && final) {
            if (regex.test(initial) && regex.test(final)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {

                        endDate: {
                            [Op.gte]: new Date(initial),
                            [Op.lt]: new Date(final)
                        }
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });

        }
        if (before) {
            if (regex.test(before)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {
                        endDate: {
                            [Op.lt]: new Date(before)
                        }
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }
        if (after) {
            if (regex.test(after)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {
                        endDate: {
                            [Op.gt]: new Date(after)
                        }
                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }

        if (equal) {
            if (regex.test(equal)) {
                const events = await Event.findAll({
                    attributes: ['id', 'title', 'startDate', 'endDate', 'description'],
                    where: {

                        endDate: {
                            [Op.eq]: new Date(equal)
                        }

                    }

                });
                return res.json({ events });
            } else return res.status(400).json({ text: "erro na formatação da data. yyyy-mm-dd" });
        }
        return res.status(404).send({ text: 'Não encontrado!' })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(400).send({ error })
    }
}

//get evento by id
exports.getById = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if(event) return res.json(event);
        return res.status(404).json("Não encontrado")
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//Fazer o cadastro do evento
exports.save = async (req, res) => {
    try {
        let { title, startDate, endDate,description } = req.body;
            const event = await Event.create({ title, startDate, endDate,description } );
            return res.status(201).json(event);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//atualizar o evento
exports.update = async (req, res) => {
    try {
        let { title, startDate, endDate,description }  = req.body;
        const [updated] = await Event.update({ title, startDate, endDate,description } , {
            where: { id: req.params.id }
        });
        if (updated) {
            const event = await Event.findByPk(req.params.id);
            res.json(event);
        } else {
            res.status(404).send('Evento não encontrado');
        }

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}
//deletar o evento
exports.delete = async (req, res) => {
    try {
        const deleted = await Event.destroy({ where: { id: req.params.id } });
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