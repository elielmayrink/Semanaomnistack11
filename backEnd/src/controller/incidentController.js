const conection = require('../database/conections');
module.exports = {

    async index(request, response) {
        const{ page = 1 } = request.query;
        const [count] = await conection('incedents').count()
        const incidentes = await conection('incedents')
        .join('ongs', 'ongs.id', '=', 'incedents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incedents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
        response.header('x-total-count', count["count(*)"])
        return response.json(incidentes);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization 

       const [id] = await conection('incedents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        const incedent = await conection('incedents')
            .where('id', id)
            .select('ong_id')
            .first();
            if (incedent.ong_id !== ong_id){
                return response.status(401).json({error: "operation not permitted."})
            }
            await conection('incedents').where('id', id).delete();

            return response.status(204).send();

    }
}