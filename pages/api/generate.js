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

    const type = req.body.type || '';
    let prompt;
    switch (type) {
        case 'primeraParte':
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
            prompt = generatePrompt1(protagonista, lugar);
            break;

        case 'segundaParte':
            const primeraParte = req.body.primeraParte || '';
            const segundaParte = req.body.segundaParte || '';
            prompt = generatePrompt2(primeraParte, segundaParte);
            break;
        default:
            break;
    }
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.6,
            max_tokens: 500,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error) {
        console.log(error)
    }
}

function generatePrompt1(protagonista, lugar) {

    return `
    crea 3 puntos:
    1. La primera parte de un cuento para niños ambientado en ${lugar} y
    que tiene como protagonista ${protagonista}.
    2. Opción A de como podria seguir el cuento. Maximo una frase.
    3. Opción B de como podria seguir el cuento. Maximo una frase.`;
}

function generatePrompt2(primeraParte, segundaParte) {
    return `crea un final corto por este cuento: ${primeraParte}. ${segundaParte}`;
}
