using System;

namespace MyNAS.Model
{
    public interface INASModel : IKeyNameModel, IDateModel
    {
        string FileName { get; }
        bool IsPublic { get; }
        string Owner { get; }
    }
}