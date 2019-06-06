import * as express from 'express'
import * as grpc from "grpc"
import { GreeterClient } from "../proto/helloworld_grpc_pb"
import { HelloRequest } from "../proto/helloworld_pb"

const router = express.Router();
const client = new GreeterClient("127.0.0.1:50051", grpc.credentials.createInsecure())


router.get("/hello", (req, res) => {
  const helloReq = new HelloRequest()
  helloReq.setName("mt_coff")
  client.sayHello(helloReq, (err, helloRes) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(helloRes.toObject())
    }
  })
})
router.get("/ping", (req, res) => {
  res.send("pong")
})

export default router