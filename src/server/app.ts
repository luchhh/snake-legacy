import http from 'http'
import path from 'path'
import express, { Request, Response, Application } from 'express';
import appRoot from 'app-root-path'

const app: Application = express();
const server = http.createServer(app);

app.use(express.static(path.join(appRoot.path, 'dist')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(appRoot.path, 'dist/index.html'));
});

server.listen(3001, () => {
  console.log("Running at http://localhost:3001");
});