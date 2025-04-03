import adze, { setup, type Level } from 'adze';
import AdzeTransportFile from '@adze/transport-file';

const format = import.meta.env.DEV ? 'pretty' : 'json';
const activeLevel = import.meta.env.LOG_LEVEL as Level ?? 'info';

const fileTransport = new AdzeTransportFile({ directory: './logs' });

const initLogger = async () => {
  await fileTransport.load();

  setup({
    activeLevel,
    format,
    middleware: [fileTransport],
    meta: {
      name: 'easy-mcp',
      hostname: import.meta.env.HOSTNAME,
    }
  });
};

initLogger().catch(err => console.error('Failed to initialize logger:', err));

const logger = adze.timestamp.ns('easy-mcp').seal();
export default logger;
