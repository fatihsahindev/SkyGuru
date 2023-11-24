using Microsoft.AspNetCore.Mvc;
using OpenMeteo;
using SkyGuru.Entity;

namespace SkyGuru.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly SkyGuruDataContext _context;

        public WeatherController(SkyGuruDataContext context)
        {
            _context = context;
        }


        [HttpGet("GetWeatherForecast")]
        public ActionResult GetWeatherForecast(string city)
        {
            try
            {
                OpenMeteoClient client = new OpenMeteoClient();

                WeatherForecast weatherData = client.QueryAsync(city).GetAwaiter().GetResult();

                if (weatherData == null)
                {
                    return NotFound("Weather data not found for the given city.");
                }

                var currentWeather = weatherData.Current;

                return Ok(currentWeather);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("GetHourlyWeather")]
        public async Task<ActionResult> GetHourlyWeatherAsync(string city)
        {
            try
            {
                OpenMeteoClient client = new OpenMeteoClient();

                WeatherForecastOptions options = new()
                {
                    Hourly = HourlyOptions.All,
                };

                var res = await client.QueryAsync(options);

                return Ok(res.Hourly);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
