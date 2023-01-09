export default async function (req, res) {
    const type = req.body.type || '';
    let prompt;
    switch (type) {
        case 'type1':
            const field1 = req.body.field1 || '';
            const field2 = req.body.field2 || '';
            prompt = generatePrompt1(field1, field2);
            break;
        case 'type2':
            const field3 = req.body.field3 || '';
            const field4 = req.body.field4 || '';
            prompt = generatePrompt2(field3, field4);
            break;
        default:
            // You could return an error or a default prompt here
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

function generatePrompt1(field1, field2) {
    return `Prompt using field1: ${field1} and field2: ${field2}`;
}

function generatePrompt2(field3, field4) {
    return `Prompt using field3: ${field3} and field4: ${field4}`;
}
