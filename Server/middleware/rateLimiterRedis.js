const config = require("../config");
const { RateLimiterRedis } = require("rate-limiter-flexible");
const redis = require("redis");
const redis_port = config.redis_port || 6379;
// Configure redis client on port 6379.
const redis_client = redis.createClient(redis_port);

const rateLimiter = new RateLimiterRedis({
  storeClient: redis_client,
  keyPrefix: "middleware",
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
};

module.exports = rateLimiterMiddleware;
