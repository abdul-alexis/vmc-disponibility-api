const bcrypt = require('bcrypt');
const axios= require('axios');
const https=require('https');
const {parse, stringify, toJSON, fromJSON} = require('flatted');
const { Event } = require('../bd/sequelize');
const { Op } = require('sequelize');
//retornar a pagina inicial
exports.getStatus = async (req, res) => {
    try {
        const agent = new https.Agent({  
            rejectUnauthorized: false
          });
        const response = await axios.get('https://35.199.86.162:8888/SSConfig/webresources/system/realtime?format=json', {
            httpsAgent: agent,
            auth: {
                username: process.env.SBC_USER,
                password: process.env.SBC_PASSWORD
            }
});
        let uptime=response.data.split('\n')[3].replace("HW Up Time:",'').trim();
        console.log('uptime :>> ', uptime);

        return res.json({uptime: uptime.replace("day","dia").replace("month","mês").replace("year","ano")});

    } catch (error) {
       
        return res.status(404).send({error})
    }
}

//retornar a pagina inicial
exports.getDisponibility = async (req, res) => {
    try {
        let initial= new Date(new Date().getFullYear()+"-01-01")
        let final= new Date()
        // console.log('initial :>> ', initial);
        // console.log('final :>> ', final);
        const events = await Event.findAll({
            attributes: ['id','startDate', 'endDate'],
            where: {
                startDate: {
                    [Op.gte]: new Date(initial),
                    [Op.lt]: new Date(final)
                }
            }

        });
        let tempoGastoAcumulado=0;
        events.forEach(event => {
            tempoGastoAcumulado+=(event.endDate-event.startDate)
            
        });
        let indisponibility=parseFloat(((tempoGastoAcumulado/(final.getTime()-initial.getTime()))*100).toFixed(2));
        let disponibility=100-indisponibility;
        return res.json({ disponibility,indisponibility });

    } catch (error) {
       console.log('error :>> ', error);
        return res.status(404).send({error})
    }
}

//retornar a pagina inicial
exports.getMonthDisponibility = async (req, res) => {
    try {
        let initial= new Date( new Date().getFullYear()+"-" + (new Date().getMonth()+1)+ "-01")
        let final= new Date()
        // console.log('initial :>> ', initial);
        // console.log('final :>> ', final);
        const events = await Event.findAll({
            attributes: ['id','startDate', 'endDate'],
            where: {
                startDate: {
                    [Op.gte]: new Date(initial),
                    [Op.lt]: new Date(final)
                }
            }

        });
        let tempoGastoAcumulado=0;
        events.forEach(event => {
            tempoGastoAcumulado+=(event.endDate-event.startDate)
            
        });
        let indisponibility=parseFloat(((tempoGastoAcumulado/(final.getTime()-initial.getTime()))*100).toFixed(2));
        let disponibility=100-indisponibility;
        return res.json({disponibility, monthEventQuantity:events.length});

    } catch (error) {
       console.log('error :>> ', error);
        return res.status(404).send({error})
    }
}
