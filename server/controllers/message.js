import Message from "../models/message.js"


var controller = {

    //function for save messages
    save: (req, res) => {
        var params = req.body
        var message = new Message()
        message.message = params.message
        message.from = params.from

        message.save((error, messageStored) => {
            if (error || !messageStored) {
                return res.status(404).send({
                    status: error,
                    message: 'No ha sido posible guardar el mensaje'
                })
            }

            return res.status(200).send({
                status: 'Success',
                messageStored
            })
        })
    },

    //Function for all messages
    getMessages: (req, res) => {
        var query = Message.find({})
        query.sort('-_id').exec((error, messages) => {
            if (error) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al extraer mensajes'
                })
            }
            if (!messages) {
                return res.status(404).send({
                    status: 'Error',
                    message: "No existen mensajes"
                })
            }

            return res.status(200).send({
                status: 'Success',
                messages
            })

        })
    }

}
export default controller