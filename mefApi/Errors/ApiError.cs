using System.Text.Json;

namespace mefApi.Errors
{
    public class ApiError
    {

        public ApiError(){}
        public ApiError(int errorCode, string errorMessage, string errorDetails="")
        {
            this.ErrorCode = errorCode;
            this.ErrorMessage = errorMessage;
            this.ErrorDetails = errorDetails;
        }
    
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
        public string ErrorDetails { get; set; } = string.Empty;

        public override string ToString()
        {
            var options = new JsonSerializerOptions() 
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            return JsonSerializer.Serialize(this, options);
        }
    }
}