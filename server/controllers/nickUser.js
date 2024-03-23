import NickUser from "../models/nickUser.js";


var controllerNick={
    save: (req, res) => {
        var params = req.body
        var nickUser = new NickUser()
        nickUser.user = params.user
        nickUser.client = params.client

        nickUser.save((error, nickUserStored) => {
            if (error || !nickUserStored) {
                return res.status(404).send({
                    status: error,
                    message: 'No ha sido posible guardar guardar el nick'
                })
            }
            return res.status(200).send({
                status: 'Success',
                nickUserStored
            })
        })

    },
    getNickUser: (req,res)=>{
        let query= NickUser.find({})
        query.sort('-_id').exec((error, nickUsers) => {
            if (error) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al obtener usuarios'
                })
            }
            if (!nickUsers) {
                return res.status(404).send({
                    status: 'Error',
                    message: "No existen usuarios"
                })
            }

            return res.status(200).send({
                status: 'Success',
                nickUsers
            })

        })
    },
    deleteNick:(req,res)=>{

        var params = req.body
        try{
           let query= NickUser.deleteOne({user:params.user})

            query.remove((error, nickUsers) => {
                if (error) {
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error al borrar el nickUser'
                    })
                }
                return res.status(200).send({
                    status: 'Success delete',
                    nickUsers,
                    params
                })

            })




        }catch (error){
            console.log(error)
        }


    }

}

export default controllerNick