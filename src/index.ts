import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const PORT = Number(process.env.PORT) || 3000;

const notes = [
    {
        id: '1',
        content: 'Primera nota',
    },
    {
        id: '2',
        content: 'Segunda nota',
    },
    {
        content: 'Nota creada',
        id: 'df10700f-18ae-41ea-9e8e-16583023b8db',
        owner: 'Pepe',
    },
];


const app = (request: IncomingMessage, response: ServerResponse) => {
    console.log(request.url, request.method);
    console.log(request.headers);
    if (request.method === 'PUT') {
        response.statusCode = 405;
        response.end('No me mola no entender esto sin patata');
        return;
    }

    if (request.method === 'POST') {
        response.statusCode = 201;
        response.end('Venga, va que lo pillo');
        return;
    }

    // Sin ruta...
    // response.setHeader('Content-type', 'text/html; charset=utf-8');
    // response.setHeader('Content-type', 'application-json')
    // response.end('¿Qué pasa mundo?');
    // return;

    try {
        switch (
            request.url //Enrutar
        ) {
            case '/':
                response.setHeader('Content-type', 'text/html; charset=utf-8');
                response.end('¿Qué pasa mundo?');
                break;
            case '/notes':
                response.setHeader('Content-type', 'application-json');
                response.write(JSON.stringify(notes));
                //Serialización. write, no esta leyendo las notas --(chunk)-- por lo que mediante la serialización le facilitamos que lo haga.
                response.write(notes)
                response.end();
                break;
            default:
                response.statusCode = 404;
                response.end();
                break;
        }
        return;
    } catch (error) {
        // Añadimos un try; catch, esto nos permitirá que cuando pete no se caiga todo el "dito" server
        console.error((error as Error).message);
    }
};

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on this ${PORT}`);
});

console.log('Backend');
