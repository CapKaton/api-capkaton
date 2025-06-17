import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import LoginController from'./Controllers/LoginController.js'
import ChallengeController from"./Controllers/ChallengeController.js"
import CodeExeculterController from './Controllers/CodeExecuterController.js'
import ResultController from './Controllers/ResultController.js'

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.use(LoginController);
app.use(ChallengeController);
app.use(CodeExeculterController);
app.use(ResultController);

app.get('/echo', async (req, res) => {
  res.status(200).json({ message: "rodando" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});