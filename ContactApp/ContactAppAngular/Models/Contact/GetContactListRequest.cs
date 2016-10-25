 namespace ContactAppAngular.Models
{
    public class GetContactListRequest 
    {
            public string SearchString { get; set; }
            public int Skip { get; set; }
            public int Take { get; set; }

    }
}
