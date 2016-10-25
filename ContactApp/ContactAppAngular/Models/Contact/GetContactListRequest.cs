 namespace ContactAppAngular.Models
{
    public class GetContactListRequest 
    {
            public string SearchText { get; set; }
            public int Skip { get; set; }
            public int Take { get; set; }

    }
}
