import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectToDb();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Response(JSON.stringify("Prompt not found"), { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 });
    }
}

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = req.json();

    try {
        await connectToDb();
        const oldPrompt = await Prompt.findById(params.id);

        if (!oldPrompt) return new Response(JSON.stringify('Failed to found prompt'), { status: 404 });

        oldPrompt.prompt = prompt;
        oldPrompt.tag = tag;
        await oldPrompt.save();
        return new Response(JSON.stringify(oldPrompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify("failed to update prompt"), { status: 500 });
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDb();

        await Prompt.findByIdAndRemove(params.id);
        return new Response(JSON.stringify("Prompt deleted successfully"), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify("failed to delete prompt"), { status: 500 });

    }
}