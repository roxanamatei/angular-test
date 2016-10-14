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

            try
            {
                foreach (var contact in result)
                {
                    contact.EditMode = 0;
                }
            }
            catch (Exception ex) {
 
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
            Contact c = new Contact();
            try
            {
                contact.Birthay = DateTime.Today;
                c = _contacts.Add(contact);
            }
            catch (Exception ex)
            {

            }

            return c;
        }

        // PUT api/<controller>/5
        public Contact Put(Contact contact)
        {
            try
            {
            if (!_contacts.Update(contact))
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            catch (Exception ex)
            {

            }
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