const Dev = require('../models/Dev');
const parseAsStringArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseAsStringArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    // Buscar Distancia em "metros". Ex.: 10000k = 10km.
                    $maxDistance: 10000,
                },
            },
        });
        // Buscar todos os devs num raio de 10Km.
        // Precisamos filtrar por tecnologias.
        return response.json({ devs });
    }
};