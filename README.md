## Updates in [Lila](https://lichess-org/lila) for local testing

### package.json

```json
  "devDependencies": {
    "chessground3D": "workspace:../chessground3D",
```

### ui/lib/package.json

```json
  "build": {
    "sync": {
      "/node_modules/chessground3D/assets/scene.glb": "/public"
    },
```

### Search and replace in *.ts files

```
from '@lichess-org/chessground';
```
becomes 
 ```
from 'chessground3D';
 ```

