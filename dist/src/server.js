"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const os = __importStar(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const typeorm_1 = require("typeorm");
typeorm_1.createConnection().then(connection => {
    const numCPUs = os.cpus().length;
    if (cluster_1.default.isMaster) {
        console.log(`Master ${process.pid} is running`);
        // Fork workers.
        for (let i = 0; i < numCPUs; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died ${code} ${signal}`);
        });
    }
    else {
        app_1.app.listen(process.env.APP_PORT);
        console.log(`Worker ${process.pid} started`);
    }
}).catch(error => console.log(error));
//# sourceMappingURL=server.js.map