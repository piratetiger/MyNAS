using System;

namespace MyNAS.Model
{
    public interface INASModel : IKeyNameModel
    {
        long Id { get; }
        string FileName { get; }
        bool IsPublic { get; }
        string Owner { get; }
        DateTime Date { get; }
    }
}