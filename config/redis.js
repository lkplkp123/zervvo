const redis = require('redis');

const client = redis.createClient({
  url: 'redis://127.0.0.1:6379', 
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

(async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
})();

module.exports = client;
