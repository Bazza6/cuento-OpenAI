import { Configuration, OpenAIApi } from "openai";

// export const config = {
//     runtime: "edge",
// }

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
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            // prompt: prompt,
            temperature: 0.8,
            max_tokens: 500,
        });
        res.status(200)
            .json({ result: completion.data.choices[0].message.content });
    } catch (error) {
        console.log(error)
    }
}

function generatePrompt1(protagonista, lugar) {

    return `
    crea tre puntos.
    1. La primera parte de un cuento lleno de aventura y sorpresas ambientado en ${lugar} y
    que tiene como protagonista ${protagonista}. Destaca las peculiaridades del protagonista y lugar.
    La primera parte del cuento termina con una pregunta al lector sobre como sigue la historia. Maximo 50 palabras.
    2. Primera opci??n para seguir la historia? Maximo 10 palabras.
    3. Segunda opci??n para seguir la historia? Maximo 10 palabras.
    `;
}

function generatePrompt2(primeraParte, segundaParte) {
    return `crea un final a sorpresa por este cuento: ${primeraParte} ${segundaParte}. Maximo 50 palabras.`;
}
