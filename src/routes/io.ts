import {container} from "@app/di";
import IoCommand from "@app/components/chat/ui/socket/io/chat";

const ioCommand: IoCommand = container.resolve(IoCommand);

class IoRouter {
    public init(socket): void {
        console.log('connected');

        socket.on('message', (msg) => {
            ioCommand.send(msg, socket)
        });

        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    }
}

export const ioRouter: IoRouter = new IoRouter();