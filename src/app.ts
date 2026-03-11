<<<<<<< HEAD
import { DatabaseModel } from "./model/DatabaseModel.js";
import { server } from "./server.js";

const port: number = 3333; //Define a porta que o servidor vai executar

//Liga o servidor HTTP
server.listen(port, () => {
    console.log(`Servidor executando no endereço: http://localhost:${port}`);
});

new DatabaseModel().testeConexao().then((resbd) => {
    if(resbd) {
        server.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        })
    } else {
        console.log('Não foi possível conectar ao banco de dados');
    }
});
=======
import { server } from "./server.js";

const port: number = 3333;

server.listen(port, () => {
    console.log(`Servidor executando no endereço http://localhost:${port}`);
});
>>>>>>> d3192eb1373e6f36288a2e68d1e072685ade720a
