import run from "../geminiApi.js";


export const aicontroller = async(req,res)=>{
try {
    const {prompt} = req.body;
    const response = await run(prompt);
    return res.json(response)
} catch (error) {
    console.log(error);
    
}
}