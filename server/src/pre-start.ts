import path from 'path';
import dotenv from 'dotenv';
import { parse } from 'ts-command-line-args';

interface IArgs {
  env: string;
}

// Command line arguments
const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: 'development',
    alias: 'e',
  },
});

// Set the env file
const result2 = dotenv.config({
  path: path.join(__dirname, `../env/${args.env}.env`),
});
if (result2.error) {
  throw result2.error;
}
