const conections = require("../database/conections")
module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;
        const incidentes = await conections('incedents')
        .where('ong_id', ong_id)
        .select('*');
        return response.json(incidentes)
    }
}