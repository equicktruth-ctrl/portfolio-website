// No need to import fetch—Node v24.11.0 has native fetch support!
const express = require('express');
const app = express();
const PORT = 5050;

const API_KEY = '[REDACTED]';

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/qna', async (req, res) => {
  const question = req.body.question;
  if (!question) {
    return res.status(400).json({ error: 'No question provided' });
  }

  try {
    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY,
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [{ role: "user", content: question }],
      }),
    });

    if (!perplexityResponse.ok) {
      const errorText = await perplexityResponse.text();
      console.error("API Response Error: ", errorText);
      return res.status(perplexityResponse.status).json({ error: errorText });
    }

    const data = await perplexityResponse.json();
const answer = data.answer ||
               (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ||
               'No answer received.';
res.json({ answer });

  } catch (err) {
    console.error("Catch Error: ", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
