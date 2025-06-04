import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import memberRoutes from './routes/member.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/members', memberRoutes);

async function start() {
  try {
    await sequelize.sync();
    console.log('Database synced');

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

start();
