using System.Collections.Generic;
namespace ContactAppAngular.Models
{
    public class GetContactListResponse
    {
        public IEnumerable<Contact> ContactList { get; set; }

        public string SearchText { get; set; }
        public int TotalFilteredCount { get; set; }

    }
}
