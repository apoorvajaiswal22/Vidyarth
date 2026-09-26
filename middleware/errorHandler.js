const multer = require('multer');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Never leak stack traces / internals to clients
  console.error('[error]', err && err.stack ? err.stack : err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large' });
    }
    return res.status(400).json({ success: false, message: `Upload error: ${err.code}` });
  }

  if (err && err.message === 'INVALID_FILE_TYPE') {
    return res.status(400).json({ success: false, message: 'Unsupported file type' });
  }

  const statusCode = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const message = statusCode === 500 ? 'Internal server error' : (err.message || 'Something went wrong');

  return res.status(statusCode).json({ success: false, message });
}

function notFoundHandler(req, res) {
  return res.status(404).json({ success: false, message: 'Route not found' });
}

module.exports = { errorHandler, notFoundHandler };
