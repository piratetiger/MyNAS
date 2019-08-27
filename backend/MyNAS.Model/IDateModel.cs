using System;

namespace MyNAS.Model
{
    public interface IDateModel : INASModel
    {
        DateTime Date { get; }
    }
}