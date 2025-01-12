const redis = require('../config/redis');

const RATE_LIMIT_CONFIG = {
  default: { limit: 3, window: 60 }, 
};

module.exports = async (req, res, next) => {
  try {
    console.log(req.user,"req.user")
    const userId = req.user.id; 
    const userMail=req.user.email;
    const userRole = req.user.role || 'default'; 
    const config = RATE_LIMIT_CONFIG[userRole] || RATE_LIMIT_CONFIG.default;

    const route = req.route.path; 
    const key = `userId:${userId} userMail:${userMail}`; 
    const { limit, window } = config;

    let routeData = await redis.hGet(key, route);

    let routeCount = routeData ? parseInt(routeData) : 0;

    if (routeCount >= limit) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        route,
        userId,
        limit,
        window,
      });
    }

    routeCount += 1;

    await redis.hSet(key, route, routeCount);

    if (routeCount === 1) {
      await redis.expire(key, window);
    }

    next();
  } catch (error) {
    console.error('Error in rate limiting middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
