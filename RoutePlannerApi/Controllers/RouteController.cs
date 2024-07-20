using Microsoft.AspNetCore.Mvc;
using RoutePlannerApi.Models;
using RoutePlannerApi.Services;

namespace RoutePlannerApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RouteController : ControllerBase
    {
        private readonly RouteService _routeService;

        public RouteController(RouteService routeService)
        {
            _routeService = routeService;
        }

        [HttpGet]
        public IEnumerable<Point> Get()
        {
            return _routeService.GetRoutePoints();
        }
    }
}
