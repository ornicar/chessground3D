## Updates in [Lila](https://lichess-org/lila) for local testing

### package.json

```json
  "devDependencies": {
    "chessground3D": "workspace:../chessground3D",
```

### ui/lib/package.json

```json
ui/lib/package.json
  "build": {
    "sync": {
      "/node_modules/chessground3D/assets/scene.glb": "/public"
    },
```

### Search and place *.ts files

`'@lichess-org/chessground';` becomes `'chessground3D';`

