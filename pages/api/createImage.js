import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const prompt = req.body.prompt
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '512x512',
    });
    res.status(200).json({
      imageURL: response.data.data[0].url // questo si deve chiamre response come sopra..
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('createImage an error occurred');
  }
}