import { Router } from "express";
import { exec } from 'child_process';
import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = Router();

const languageMap = {
    javascript: {
        ext: '.js',
        cmd: (filename) => `node ${filename}`,
    },
    python: {
        ext: '.py',
        cmd: (filename) => `python3 ${filename}`,
    },
    bash: {
        ext: '.sh',
        cmd: (filename) => `bash ${filename}`,
    },
    java: {
        ext: '.java',
        cmd: () => `javac Main.java && java Main`,
        fixedFile: 'Main.java', 
        clean: () => ['Main.java', 'Main.class']
  },
};
  
  const TMP_DIR = path.join(__dirname, '../tmp');
  
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR);
  }
  
async function executeCode(language, code) {
    const lang = languageMap[language];
    if (!lang) throw new Error(`Linguagem "${language}" não suportada.`);

    const id = randomUUID();
    const filename = path.join(TMP_DIR, lang.fixedFile || `${id}${lang.ext}`);

    fs.writeFileSync(filename, code);

    const command = lang.cmd(filename, id);

    return new Promise((resolve) => {
        exec(command, { cwd: TMP_DIR }, (error, stdout, stderr) => {
            const filesToClean = lang.clean ? lang.clean(id) : [filename];
            cleanupFiles(filesToClean);

            resolve({
                error: error ? error.message : null,
                stdout,
                stderr,
            });
        });
    });
}

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