namespace RoutePlannerApi.Models
{
    public class Track
    {
        public int FirstId { get; set; }
        public int SecondId { get; set; }
        public double Distance { get; set; }
        public Surface Surface { get; set; }
        public MaxSpeed MaxSpeed { get; set; }
    }

    public enum Surface
    {
        SAND,
        ASPHALT,
        GROUND
    }

    public enum MaxSpeed
    {
        FAST,
        NORMAL,
        SLOW
    }
}
