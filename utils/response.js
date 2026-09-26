function success(res, message, data = {}, statusCode = 200) {
  return res.status(statusCode).json({ success: true, message, data });
}

function error(res, message, statusCode = 400) {
  return res.status(statusCode).json({ success: false, message });
}

module.exports = { success, error };
