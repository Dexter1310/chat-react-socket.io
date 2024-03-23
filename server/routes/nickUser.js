import express from "express"
import controllerNick from "../controllers/nickUser.js"

let routerNick = express.Router();

routerNick.post('/save-nick',controllerNick.save)
routerNick.get('/nicks',controllerNick.getNickUser)
routerNick.delete('/delete-nick',controllerNick.deleteNick)

// routerNick.delete('delete-nick/:user')


export default routerNick