const express = require('express');
const app = express();

app.use(express.json());

app.post('/', (req, res) => {
  const { document_type, client_info, jurisdiction } = req.body;

  if (!document_type || typeof document_type !== 'string') {
    return res.status(400).json({ error: "Missing or invalid 'document_type'" });
  }

  if (!client_info || typeof client_info !== 'object') {
    return res.status(400).json({ error: "Missing or invalid 'client_info'" });
  }

  if (!jurisdiction || typeof jurisdiction !== 'string') {
    return res.status(400).json({ error: "Missing or invalid 'jurisdiction'" });
  }

  const prompt = `
You are a highly experienced estate planning attorney and legal document drafter.

Your task is to draft a comprehensive **${document_type}** tailored for the following client and legal jurisdiction:

**Client Information:**
${JSON.stringify(client_info, null, 2)}

**Jurisdiction:** ${jurisdiction}

Ensure the document is legally sound and adheres to best practices in estate planning law within the specified jurisdiction. Use formal and precise legal language appropriate for client deliverables.
`.trim();

  res.json({ prompt });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
