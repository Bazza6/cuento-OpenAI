import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      }
    });
    return;
  }

  const protagonista = req.body.protagonista || '';
  if (protagonista.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "completar el campo protagonista",
      }
    });
    return;
  }
  const lugar = req.body.lugar || '';
  if (lugar.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "completar el campo lugar",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(protagonista, lugar),
      temperature: 0.6,
      max_tokens: 500,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(protagonista, lugar) {

  return `
  crea 3 puntos:
  1. La primera parte de un breve cuento para niños ambientado en ${lugar} y
  que tiene como protagonista ${protagonista}.
  2. Opción A de como podria seguir el cuento. Maximo dos frases.
  3. Opción B de como podria seguir el cuento. Maximo dos frases.`;
}
