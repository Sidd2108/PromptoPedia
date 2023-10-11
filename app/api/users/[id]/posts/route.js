import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectToDb();

        const prompts = await Prompt.find({ creator: params.id }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch posts", { status: 500 });
    }
}