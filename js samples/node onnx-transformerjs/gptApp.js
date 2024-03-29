
const http = require('http');
const querystring = require('querystring');
const url = require('url');


class MyClassificationPipeline {
  static task = 'text-generation';
  static model = 'Xenova/LaMini-GPT-124M';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // Dynamically import the Transformers.js library
      let { pipeline, env } = await import('@xenova/transformers');

      // NOTE: Uncomment this to change the cache directory
      env.cacheDir = './cacheGPT';

      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

// Comment out this line if you don't want to start loading the model as soon as the server starts.
// If commented out, the model will be loaded when the first request is received (i.e,. lazily).
MyClassificationPipeline.getInstance();

// Define the HTTP server
const server = http.createServer();
const hostname = '127.0.0.1';
const port = 3000;

// Listen for requests made to the server
server.on('request', async (req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url);

  // Extract the query parameters
  const { text } = querystring.parse(parsedUrl.query);

  // Set the response headers
  res.setHeader('Content-Type', 'application/json');

  let response;
  if (parsedUrl.pathname === '/gpt2lamini' && text) {
    const model = await MyClassificationPipeline.getInstance(); 

    input_prompt = `Below is an instruction that describes a task. Write a response that appropriately completes the request.\n\n### Instruction:\n ${text}\n\n### Response:`
    response = await model(input_prompt, {max_length:512, do_sample:true});
    res.statusCode = 200;
} else {
    response = { 'error': 'Bad request' }
    res.statusCode = 400;
}

    // Send the JSON response
    let generatedTextFromModel = removeWordsFromStartAndAfter(response?.[0]['generated_text'], 'Response:')
    // res.end(JSON.stringify(response?.[0]['generated_text']));
    res.end(JSON.stringify(generatedTextFromModel))
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//http://localhost:3000/gpt2lamini?text=hello

function removeWordsFromStartAndAfter(inputString, targetWord) {
    const targetIndex = inputString.indexOf(targetWord);
        if (targetIndex !== -1) {
            const wordsToKeep = inputString.substring(targetIndex+ 9).trim();
            return wordsToKeep;
        }
        return inputString;
}