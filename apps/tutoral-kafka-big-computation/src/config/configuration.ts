import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME =
  process.env.YAML_CONFIG_FILENAME || 'tutorial-kafka-big-computatuon.yml';

export default () => {
  const config = yaml.load(
    readFileSync(
      join(__dirname, '../../config/', YAML_CONFIG_FILENAME),
      'utf8',
    ),
  ) as Record<string, any>;
  config.app.port = process.env.PORT ?? config.app.port;
  return config;
};
