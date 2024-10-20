import axios from 'axios';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://your-n8n-instance/webhook/ace';

export async function processWithN8NAgent(input: string): Promise<string> {
  try {
    const response = await axios.post(N8N_WEBHOOK_URL, { input });
    return response.data.formattedResponse || 'No response from n8n agent.';
  } catch (error) {
    console.error('Error processing with n8n agent:', error);
    throw new Error('Error processing your request. Please try again later.');
  }
}
