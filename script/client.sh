#!/usr/bin/env bash

set -eu

cd client
yarn build
yarn start
