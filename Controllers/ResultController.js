import { Router } from "express";
import { getResultByGroup  } from '../Database/Repositories/ResultRepository.js';
import {checkQuestion} from '../Helpers/ResultHelper.js'
const app = Router();

app.get('/Result/ResultByGroup/:groupId', async (req, res) => {
    const {groupId } = req.params;
    
    if (!groupId) {
      return res.status(400).json({ error: 'Faltando groupId.'});
    }
    try {
        const groupResult = await getResultByGroup(groupId);
        const combinedResults = groupResult.map((item) => {
            const processed = checkQuestion(item);

            return {
                ...item,
                ...processed 
            };
        });

        res.json(combinedResults);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default app;