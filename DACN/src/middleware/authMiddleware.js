const jwt = require('jsonwebtoken');
// for admin
const authMiddleWare = (req, res, next) => {
  let token = req.header('x-access-token');
  if (!token)
    return res.status(403).json({ error: true, message: 'Access Denied: No token provided' });
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, tokenDetails) => {
      if (err) {
        return res.status(404).json({
          message: 'Invalid authentication',
          status: 'ERROR',
        });
      } else {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (tokenDetails.exp && tokenDetails.exp >= currentTimestamp) {
          if (tokenDetails?.isAdmin) {
            next();
          } else {
            return res.status(404).json({
              message: 'The authemtication',
              status: 'ERROR',
            });
          }
        } else {
          return res.status(401).json({
            error: true,
            message: 'Access Denied: Access token has expired.',
          });
        }
      }
    });
  } catch (error) {
    return res.status(403).json({ error: true, message: 'Access Denied: Invalid token' });
  }
};
//for user, admin
const authUserMiddleWare = async (req, res, next) => {
  let token = req.header('x-access-token');
  if (!token)
    return res.status(403).json({ error: true, message: 'Access Denied: No token provided' });
  try {
    let userId = req.params.userId;

    jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, tokenDetails) => {
      if (err) {
        return res.status(404).json({
          message: 'token expired',
          status: 'ERROR',
        });
      } else {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Thời gian hiện tại dưới dạng timestamp (giây)
        if (tokenDetails.exp && tokenDetails.exp >= currentTimestamp) {
          if (tokenDetails?.isAdmin || tokenDetails?.id === userId) {
            next();
          } else {
            return res.status(404).json({
              message: 'The authemtication',
              status: 'ERROR',
            });
          }
        } else {
          return res.status(401).json({
            error: true,
            message: 'Access Denied: Access token has expired.',
          });
        }
      }
    });
  } catch (error) {
    console.log(err);
    return res.status(403).json({ error: true, message: 'Access Denied: Invalid token' });
  }
};
// in case only check token exit
const authUserMiddleWarecustom = async (req, res, next) => {
  let token = req.header('x-access-token');
  if (!token)
    return res.status(403).json({ error: true, message: 'Access Denied: No token provided' });
  try {
    let userId = req.params.userId;

    jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, (err, tokenDetails) => {
      if (err) {
        return res.status(404).json({
          message: 'token expired',
          status: 'ERROR',
        });
      } else {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Thời gian hiện tại dưới dạng timestamp (giây)
        if (tokenDetails.exp && tokenDetails.exp >= currentTimestamp) {
          next();
        } else {
          return res.status(401).json({
            error: true,
            message: 'Access Denied: Access token has expired.',
          });
        }
      }
    });
  } catch (error) {
    console.log(err);
    return res.status(403).json({ error: true, message: 'Access Denied: Invalid token' });
  }
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
  authUserMiddleWarecustom,
};
