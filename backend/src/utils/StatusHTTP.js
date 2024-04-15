const httpErrorMap = {
  SUCCESSFUL: 200,
  NO_CONTENT: 204,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = httpErrorMap;
