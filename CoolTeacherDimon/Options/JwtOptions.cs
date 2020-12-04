namespace CoolTeacherDimon.Options
{
    /// <summary>
    /// Represents JWT options
    /// </summary>
    public class JwtOptions
    {
        /// <summary>
        /// Gets or sets token key
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Gets or sets token issuer
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// Gets or sets token expiration time
        /// </summary>
        public int ExpiryTimeInHours { get; set; }
    }
}
