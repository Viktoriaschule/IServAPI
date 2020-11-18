import path from 'path';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'config.json')).toString());

export default config;