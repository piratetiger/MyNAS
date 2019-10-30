using System.Collections.Generic;

namespace MyNAS.Model
{
    public interface INASFilterRequest : IDateFilterRequest
    {
        List<string> Owner { get; }
    }
}