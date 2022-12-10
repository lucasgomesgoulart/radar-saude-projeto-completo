const UserRepository = require('../Repository/UserRepository')


module.exports = {
    async update(req, res) {
        const { name, sex, datebirthday, phone, email } = req.body
        const id = req.params.id
        const update = await UserRepository
            .update(id, { name: name, sex: sex, datebirthday: datebirthday, phone: phone, email: email })
        console.log(update);
        return res.status(200).send()
    },

    async delete(req, res) {
        const id = req.params.id
        const deletar = await UserRepository
            .delete(id)
        console.log(deletar);
        return res.status(204).send()
    },

    async insert(req, res) {
        const { name, sex, datebirthday, phone, email } = req.body
        const insert = await UserRepository
            .insert({ name: name, sex: sex, datebirthday: datebirthday, phone: phone, email: email }) 
        console.log(insert);
        return res.send({
            name, sex, datebirthday, phone, email
        })
    },

    async findAll(req, res) {
        const filter = req.query.name
        const listUsers = await UserRepository.findAll(filter)
        res.json(listUsers)
    }
}
