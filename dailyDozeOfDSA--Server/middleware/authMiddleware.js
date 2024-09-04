export function ensureAuthentication(request, response, next) {
  if (request.isAuthenticated()) {
    return next();
  }
  response.status(401).json({
    success: false,
    message: "you are not authorized to make this request",
    redirect: "/?unauthorized_access=true",
  });
}
