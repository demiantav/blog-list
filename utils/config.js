import dotenv from 'dotenv';

dotenv.config();

const { PORT } = process.env;

const MONGO_URI = process.env.NODE_ENV === 'test' ? process.env.MONGOTEST_URI : process.env.MONGO_URI;

export default { PORT, MONGO_URI };
