import axios from 'axios';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/ace';

interface N8NResponse {
  text: string;
  error?: string;
}

export async function processWithN8NAgent(message: string): Promise<string> {
  try {
    const response = await axios.post(N8N_WEBHOOK_URL, { 
      message,
      // Add any additional context or metadata needed by the n8n workflow
    });

    // Handle the n8n webhook response
    const data = response.data as N8NResponse;
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.text;
  } catch (error) {
    console.error('Error processing with n8n agent:', error);
    throw new Error('Error processing your request. Please try again later.');
  }
}

// Stream the n8n response for real-time chat updates
export async function* streamWithN8NAgent(message: string): AsyncGenerator<string> {
  const response = await processWithN8NAgent(message);
  
  // Split response into chunks and yield them
  const chunks = response.split(' ');
  for (const chunk of chunks) {
    yield chunk + ' ';
    // Add small delay to simulate streaming
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}
