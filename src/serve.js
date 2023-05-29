const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const runServe = async () => {
    const config = {
        port: 9000,
        host: 'localhost',
    };
    const server = Hapi.server(config);
    server.route(routes);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

runServe();