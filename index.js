const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

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
      cmd: (filename) => {
      const className = path.basename(filename, '.java');
      return `javac ${filename} && java ${className}`;
      },
  },
  cpp: {
      ext: '.cpp',
      cmd: (filename) => {
      const outPath = filename.replace('.cpp', '');
      return `g++ ${filename} -o ${outPath} && ./${outPath}`;
      },
  },
};

const TMP_DIR = path.join(__dirname, 'tmp');

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR);
}

async function executeCode(language, code) {
  const entry = languageMap[language];
  if (!entry) throw new Error(`Linguagem "${language}" não suportada.`);

  const randomName = Math.random().toString(36).substring(2, 8);
  const filename = path.join(TMP_DIR, `${randomName}${entry.ext}`);

  fs.writeFileSync(filename, code);

  const command = entry.cmd(filename);

  return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
      fs.unlinkSync(filename);

      if (entry.ext === '.java') {
          const classFile = path.join(TMP_DIR, `${randomName}.class`);
          if (fs.existsSync(classFile)) fs.unlinkSync(classFile);
      }

      if (entry.ext === '.cpp') {
          const binFile = path.join(TMP_DIR, randomName);
          if (fs.existsSync(binFile)) fs.unlinkSync(binFile);
      }

      resolve({
          error: error ? error.message : null,
          stdout,
          stderr,
      });
      });
  });
}

app.post('/execute', async (req, res) => {
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

app.get('/echo', async (req, res) => {
  res.status(200).json({ message: "rodando" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});