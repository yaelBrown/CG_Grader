import axios from "axios";

class GraderHelper {

  _apiKey = "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" // Replace with environmental variable

  _generatePrompt(pos, neg) {
    return true
  }

  async makeOpenAIRequest() {
    const options = {
      method: 'POST',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${this._apiKey}`
      },
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'What is 4 * 5?' }
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