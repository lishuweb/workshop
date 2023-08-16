const info = require("./logger");

const noHandlers = (request, response) => {
    response.status(404).send("No code available to handle this request");
}

const errorHandler = (error, request, response, next) => {
    info(error.message);
  
    if (error.name === 'CastError') 
    {
      return response.status(400).send({ error: 'malformatted id' });
    } 
    else if(error.name === "ValidationError")
    {
      return response.status(400).json({error: error.message});
    }
  
    next(error);
};

const requestLogger = (request, response, next) => {
    info("Method:", request.method);
    info("Path:", request.path);
    info("body:", request.body);
    info("hello!");
    next();
};

module.exports = {
    errorHandler,
    noHandlers,
    requestLogger,
}