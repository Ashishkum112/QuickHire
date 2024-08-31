import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});



const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

 async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
     // safetySettings: Adjust safety settings
     // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
          {
            role: "user",
            parts: [
              {text: "Please act as an interviewer and provide me with a list of 10 probable interview questions. These questions should be suitable for a [specific job title, e.g., software developer, marketing manager, etc.] and cover a range of topics including skills, experience, and behavioral aspects. Please number each question in the list."},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "## Interview Questions for a [Specific Job Title - e.g., Software Developer]\n\n**Technical Skills and Experience**\n\n1. **Can you tell me about a recent software project you worked on where you had to overcome a significant technical challenge? What was the challenge, how did you approach it, and what was the outcome?** (Focuses on problem-solving, technical expertise, and project management)\n2. **Describe your experience with [specific programming language/framework/technology relevant to the job] and give an example of a time you used it effectively.** (Assesses technical proficiency in specific tools used by the company)\n3. **What are some of the design patterns you are familiar with and when would you use them in your work?** (Evaluates understanding of software design principles and best practices)\n\n**Behavioral and Soft Skills**\n\n4. **Tell me about a time you had to collaborate with a team on a complex project. What was your role, and how did you contribute to the success of the project?** (Explores communication, teamwork, and collaboration skills)\n5. **How do you stay up-to-date with the latest advancements and trends in the software development world?** (Evaluates commitment to continuous learning and professional growth)\n6. **Describe a situation where you encountered a disagreement with a colleague on a technical decision. How did you handle the situation, and what was the outcome?** (Assesses conflict resolution and communication skills)\n\n**Company Culture and Fit**\n\n7. **What are your expectations for your role in this company, and how do you see yourself contributing to our team?** (Gauges understanding of the role and company vision)\n8. **Why are you interested in this specific position at [Company Name]?** (Explores motivation and alignment with company values)\n9. **What are your salary expectations?** (Standard question to assess compensation expectations)\n\n**Additional Question for Closing**\n\n10. **Do you have any questions for me about the position or the company?** (Provides an opportunity for the candidate to demonstrate initiative and curiosity)\n\n**Note:** This is a general list, and you should adapt these questions to the specific requirements of the role and company. You can also use these questions as a starting point and tailor them to your specific needs and the candidate's background. \n"},
            ],
          },
          {
            role: "user",
            parts: [
              {text: "it should only give 10 questions and by numbers "},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "## 10 Interview Questions for a Software Developer:\n\n1. **Describe a complex software project you worked on. What were your responsibilities, and what challenges did you face? How did you overcome them?**\n2. **What programming languages and frameworks are you most proficient in? Give an example of a project where you successfully implemented a specific language/framework.** \n3. **Explain the concept of object-oriented programming and provide an example of how you've used it in your work.**\n4. **How do you stay up-to-date with the latest software development trends and technologies?**\n5. **Tell me about a time you had to debug a complex software issue. What steps did you take to identify and resolve the problem?**\n6. **Describe a situation where you had to collaborate with a team on a challenging project. How did you effectively communicate and work together to achieve the desired outcome?**\n7. **What are your preferred tools and methodologies for software development? Why?**\n8. **How would you approach a new project with unfamiliar technologies?**\n9. **What are your salary expectations?**\n10. **Do you have any questions for me about the company or the position?** \n"},
            ],
          },
        ],
      });   

    const result = await chatSession.sendMessage(prompt);
    
    return result.response.text();
}
//run();
export default run;