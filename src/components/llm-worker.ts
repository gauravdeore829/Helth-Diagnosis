import { WebWorkerMLCEngineHandler } from '@mlc-ai/web-llm';

// A worker that simply handles the logic for the WebMLCEngine
const handler = new WebWorkerMLCEngineHandler();
self.onmessage = (msg: MessageEvent) => {
    handler.onmessage(msg);
};
