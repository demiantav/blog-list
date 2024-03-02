import app from './app.js';
import config from './utils/config.js';
import loggers from './utils/loggers.js';

app.listen(config.PORT, () => {
  loggers.info(`Server running on port ${config.PORT}`);
});
