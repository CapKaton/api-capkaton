import { Router } from "express";
import {getQuestion,postQuestion} from "../Database/Repositories/ChallengeRepository.js"
const app = Router();

app.get('/Challenge/getChallengeQuestion/:challengeId', async (req, res) => {
    const { challengeId } = req.params;
    
    if (!challengeId) {
        return res.status(400).json({ error: 'Faltando "challengeId".' });
    }

    try {
        const result = await getQuestion(challengeId);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/Challenge/postChallenge/', async (req, res) => {
    const { challengeId,groupId,questionId,questionAnswer,questionResult,timeSpent} = req.body;

    if (!challengeId || !groupId || !questionId || !questionAnswer || !questionResult || !timeSpent) {
        return res.status(400).json({ error: 'Faltando algum campo.' });
    }

    try {
        const result = await postQuestion(challengeId,groupId,questionId,questionAnswer,questionResult,timeSpent);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default app;