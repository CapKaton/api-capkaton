import { Router } from "express";
import { executeCode  } from '../Helpers/CodeExecuterController.js';

const app = Router();

app.post('/CodeExecuter/execute', async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: 'Faltando "language" ou "code"' });
  }
  try {
    const result = await executeCode(language, code);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default app;