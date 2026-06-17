import { GoogleGenAI } from "@google/genai";
import Product from "../models/productModel.js";

const ai = new GoogleGenAI({});

export const getAnswer = async (req, res, next) => {
    try {
        const { question } = req.body

        if (!question) {
            res.status(400)
            throw new Error("Please Ask Valid Question")
        }

        const allStock = await Product.find().populate("shop")

        let prompt = `You are a smart AI shop assistant that helps users find products from the data provided.
You will always receive an array of product objects (each containing name, description, category, price, stock, and shop details) also you can help with shops information like address.

Your task is to:
Understand the user's intent.
Search strictly within the given data for the most relevant product(s).
Respond in one short, natural sentence that feels like human conversation and you can add emojis also.

Always include: The product name, The shop name, (Optional) a useful detail like price or category.

If no match is found reply exactly: "Currently no item available."

Rules: Never generate or assume products that are not present in the provided data.
Don't list multiple items unless the user explicitly asks for options.
Keep tone friendly, simple, and concise (one-liner).
Use data fields naturally — don't repeat raw object keys or IDs.

here are question : ${question}
here are stock details : ${JSON.stringify(allStock)}`

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        res.status(200).json({
            success: true,
            message: response.text
        })
    } catch (error) {
        next(error)
    }
}
