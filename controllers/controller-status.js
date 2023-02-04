const bcrypt = require('bcrypt');
const axios= require('axios');
const https=require('https');
const {parse, stringify, toJSON, fromJSON} = require('flatted');
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
