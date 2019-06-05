#!/usr/bin/env bash

set -eu
export PATH="$PATH:$(yarn bin)"

PROTO_SRC=./proto
PROTO_OUT=./proto

grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${PROTO_OUT} \
  --grpc_out=${PROTO_OUT} \
  --plugin=protoc-gen-grpcc=$(which grpc_tools_node_protoc_plugin) \
  -I ${PROTO_SRC} \
  ${PROTO_SRC}/*.proto

grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=$(npm bin)/protoc-gen-ts \
  --ts_out=${PROTO_OUT} \
  -I ${PROTO_SRC} \
  ${PROTO_SRC}/*.proto