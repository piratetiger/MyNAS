namespace MyNAS.Model
{
    public interface INASModel
    {
        long Id { get; }
        string FileName { get; }
        bool IsPublic { get; }
        string Owner { get; }
    }
}