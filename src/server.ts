import "reflect-metadata";
import {io, server} from './app';
import {ioRouter} from './routes/io';
import * as os from 'os';
import cluster from 'cluster';
import {createConnection} from "typeorm";

createConnection().then(connection => {
    const numCPUs = os.cpus().length;

    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died ${code} ${signal}`);
        });
    } else {
        io.on('connection', ioRouter.init);

        server.listen(process.env.APP_PORT);

        console.log(`Worker ${process.pid} started`);
    }

}).catch(error => console.log(error));

