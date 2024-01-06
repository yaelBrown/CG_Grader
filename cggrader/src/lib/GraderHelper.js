import axios from "axios";
import Keys from "./Keys";

class GraderHelper {

  _generatePrompt(pos, neg) {
    return true
  }

  async makeOpenAIRequest(neg, pos) {
    let prompt = "Write me feedback to a student where he did the following items in this array incorrectly: "

    neg.forEach(e => {
      prompt += e + ", "
    });

    prompt += "and did these items very well: "

    pos.forEach(e => {
      prompt += e + ", "
    })

    prompt += "Please generate the response into one paragraph, remove 'dear students name' and 'your name, position, contact information'. Then in another paragraph state 'Overall, good job with the project. The only thing(s) points were taken off for was for; ' then list the negative items in the past tense."

    console.log(prompt)

    const options = {
      method: 'POST',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        ContentType: 'application/json',
        Authorization: Keys.CHATGPT_API ? `Bearer ${Keys.CHATGPT_API}` : false
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ]
      }
    };

    try {
      const response = await axios.request(options);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error making OpenAI request:', error);
      throw error; // Re-throw the error if necessary
    }
  }
}

export default GraderHelper