<<<<<<< HEAD
import express from "express"; //Importa o pacote express
import cors from "cors"; //Importa o pacote CORS
import { router } from "./routes.js"; //Importa a configuração das rotas

const server = express(); //Cria um servidor HTTP
server.use(cors()); //Configura o servidor para usar o CORS
server.use(express.json()); //Configura o servidor para usar o JSON
server.use(router); //Adiciona as rotas ao servidor HTTP

export {server}; //Exporta o servidor
=======
import express from "express";
import cors from "cors";
import { router} from "./routes.js";

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);

export { server };
>>>>>>> d3192eb1373e6f36288a2e68d1e072685ade720a
