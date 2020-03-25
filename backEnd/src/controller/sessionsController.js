const conections = require('../database/conections')
module.exports = {
    async create(request, respose){
        const { id } = request.body;

        const ong = await conections('ongs')
        .where('id', id)
        .select('name')
        .first()
        if(!ong){
            return respose.status(400).json({error: "no ong found with this id"})
        }

        return respose.json(ong);
    }
}