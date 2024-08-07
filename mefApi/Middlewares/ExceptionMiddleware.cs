using System.Net;
using mefApi.Errors;

namespace mefApi.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;
        private readonly IHostEnvironment env;
        public ExceptionMiddleware(RequestDelegate next, 
                                    ILogger<ExceptionMiddleware> logger,
                                    IHostEnvironment env)
        {
            this.next = next;
            this.logger = logger;
            this.env = env;
        }

        public async Task Invoke(HttpContext context) 
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                ApiError response; 
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                String message; 
                var exceptionType = ex.GetType();

                if(exceptionType == typeof(UnauthorizedAccessException)) 
                {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "Vous n'êtes pas authorisé à utiliser se service";
                } else 
                {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "Une erreur est survenue";
                }


                if(env.IsDevelopment()) {
                    var errorDetail = ex.StackTrace;
                    string trace = "";
                    if(errorDetail != null) {
                        trace = errorDetail.ToString();
                    }
                    response = new ApiError((int)statusCode,ex.Message,trace);
                } else {
                    ApiError apiError = new ApiError((int)statusCode, message);
                    response = apiError;
                }

                logger.LogError(ex, ex.Message);
                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(response.ToString());
            }
        }
    }
}