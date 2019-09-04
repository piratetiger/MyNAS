namespace MyNAS.Model
{
    public class MessageDataResult<T> : DataResult<T>
    {
        private string _action;
        private bool _actionResult;

        public MessageDataResult(string action, bool actionResult, T data) : base(data)
        {
            _action = action;
            _actionResult = actionResult;
        }

        public bool MessageResult
        {
            get
            {
                return true;
            }
        }

        public override string Message
        {
            get
            {
                return $"{_action} {(_actionResult ? "Success" : "Failed")}";
            }
        }
    }

    public class MessageDataResult : MessageDataResult<bool>
    {
        public MessageDataResult(string action, bool actionResult) : base(action, actionResult, actionResult)
        {
        }
    }
}