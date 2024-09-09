import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { swaggerUi, swaggerSpec } from './config/swaggerConfig.js';

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readdirSync } from 'fs';
import connectDB from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

connectDB().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('Could not connect to MongoDB:', err));

app.use(bodyParser.json({ limit: '1000MB' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Load routes
const routesDir = path.join(__dirname, 'routes');
readdirSync(routesDir).forEach((file) => {
  if (file.endsWith('.js')) {
    import(`./routes/${file}`).then((module) => {
      app.use('/', module.default);
    });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

const port = process.env.PORT || 3301;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;