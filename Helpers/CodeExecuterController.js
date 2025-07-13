import { exec } from 'child_process';
import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  
function cleanupFiles(files) {
    files.forEach(file => {
        try {
            fs.unlinkSync(file);
        } catch (err) {
            console.error(`Erro ao remover ${file}:`, err.message);
        }
    });
}

export async function executeCode(language, code) {
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