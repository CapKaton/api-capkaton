import { Router } from "express";
import { createGroup  } from '../Database/Repositories/LoginRepository.js';
const app = Router();

app.post('/Login/logon', async (req, res) => {
    const {groupName, playerOne, playerTwo } = req.body;
    
    if (!playerOne || !playerTwo  || !groupName) {
      return res.status(400).json({ error: 'Faltando "playerOne" ou "playerTwo" ou "groupName".'});
    }
    try {
      const groupId = await createGroup(groupName, playerOne, playerTwo);
      res.json(groupId);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default app;