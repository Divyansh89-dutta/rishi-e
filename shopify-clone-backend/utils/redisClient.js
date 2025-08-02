// utils/redisClient.js
import { createClient } from "redis";

console.log("🔍 REDIS_URL from .env:", process.env.REDIS_URL); // debug line

const redisClient = createClient({
    username: 'default',
    password: 'iWEDtAe7E1D4ILrV8MWerMgW4HYFkQq1',
    socket: {
        host: 'redis-19118.c240.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 19118
    }
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis Cloud connected");
  }
};

export { redisClient, connectRedis };
