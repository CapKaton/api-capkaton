import { Router } from "express";
import {getQuestion,postQuestion} from "../Database/Repositories/ChallengeRepository.js"
import {getLenguages} from "../Database/Repositories/LanguagesRepository.js"
const app = Router();

app.get('/Challenge/getChallengeQuestion/:challengeId', async (req, res) => {
    const { challengeId } = req.params;
    
    if (!challengeId) {
        return res.status(400).json({ error: 'Faltando "challengeId".' });
    }

    try {
        let result = await getQuestion(challengeId);
        const languages = await getLenguages();
        const starterCode = {};
        languages.forEach(lang => {
            starterCode[lang.language_name] = lang.code_base;
        });

        result.forEach(lang => {
            lang.starterCode = starterCode;
        });
        
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