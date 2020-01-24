const axios = require('axios');
const Dev = require('../models/Dev');
const parseAsStringArray = require('../utils/parseStringAsArray');

// O controller geralmente tem 5 funções.
// index, store, show, update, destroy.
// Index = Quando eu quero mostrar uma lista em caso de Devs.
// Show = Quando eu quero mostrar um UNICO desenvolverdor (Ex.).
// Store = Quando eu quero criar.
// Update = Quando eu quero alterar.
// Destroy = Quando eu quero deletar.

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },


    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            //await (Serve para continuar o resto do código).
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseAsStringArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        
        // (Condição usada para caso o nome do usuário do GitHub não existir, utiliza-se o login)
        // (condição abaixo substituido por [let {name = login, avatar_url, ...}] substituido pelo IF)
        /*    if(!name){
                name = apiResponse.data.login;
            }
        */
            }

            
        return response.json(dev); 
    }
};