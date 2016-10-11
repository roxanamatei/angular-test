using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ContactAppAngular.Models;

namespace ContactAppAngular.Controllers
{
    public class ContactsController : ApiController
    {
        private static readonly IContactRepository _contacts = new ContactRepository();
        // GET api/<controller>
        public IEnumerable<Contact> Get()
        {
            var result = _contacts.GetAll();

            foreach (var contact in result)
            {
                contact.EditMode = 0;
            }

            return result;
        }

        // GET api/<controller>/5
        public Contact Get(int id)
        {
            Contact c = _contacts.Get(id);
            if (c == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return c;
        }

        // POST api/<controller>
        public Contact Post(Contact contact)
        {
            return _contacts.Add(contact);

        }

        // PUT api/<controller>/5
        public Contact Put(Contact contact)
        {
            if (!_contacts.Update(contact))
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return contact;

        }

        // DELETE api/<controller>/5
        public Contact Delete(int id)
        {
            Contact c = _contacts.Get(id);
            _contacts.Remove(id);
            return c;
        }
    }
}