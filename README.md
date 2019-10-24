# orion-wanchain
Orion Protocol integration with Wanchain

## How to Build
```
npx grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:./generated \
--grpc_out=./generated \
-I ./proto \
./proto/*.proto

npx grpc_tools_node_protoc \
--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
--ts_out=./generated \
-I ./proto \
./proto/*.proto
```