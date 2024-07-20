using RoutePlannerApi.Models;

namespace RoutePlannerApi.Services
{
    public class RouteService
    {
        public List<Point> GetRoutePoints()
        {
            return new List<Point>
            {
                new Point { Id = 1, Name = "Point 1", Height = 100 },
                new Point { Id = 2, Name = "Point 2", Height = 150 },
                new Point { Id = 3, Name = "Point 3", Height = 120 },
            };
        }
    }
}
