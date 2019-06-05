import grpc from "grpc";
import { HelloReply, HelloRequest } from "../proto/helloworld_pb";
import { IGreeterServer, GreeterService } from "../proto/helloworld_grpc_pb";

class ServerImpl implements IGreeterServer {
  sayHello(
    call: grpc.ServerUnaryCall<HelloRequest>,
    callback: grpc.sendUnaryData<HelloReply>
  ) {
    const reply = new HelloReply();
    console.debug(call.request.getName());
    reply.setMessage(`こんにちは ${call.request.getName()}`);
    callback(null, reply);
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(GreeterService, new ServerImpl());
  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
  server.start();
  console.info("Server started, listening: localhost:50051");
}

main();
