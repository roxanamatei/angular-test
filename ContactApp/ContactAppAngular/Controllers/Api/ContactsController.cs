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
            catch (Exception ex)
            {
                //TODO logging
            }

            return result;
        }

        [HttpPost]
        public GetContactListResponse GetContactList(GetContactListRequest request)
        {
            var response = new GetContactListResponse();
            try
            {
                var result = _contacts.GetAll();

                if (!string.IsNullOrEmpty(request.SearchText))
                {
                    result = result.Where(x =>
                        x.LastName.ToLower().Contains(request.SearchText.ToLower()) ||
                        x.FirstName.ToLower().Contains(request.SearchText.ToLower()) ||
                        x.Email.ToLower().Contains(request.SearchText.ToLower())).ToList();
                }

                response.TotalFilteredCount = result.Count();

                response.ContactList = result
                .Skip(request.Skip).
                    Take(request.Take); ;
            }
            catch (Exception ex)
            {
                //TODO logging
            }

            return response;
        }

        public Contact Get(int id)
        {

            Contact c = _contacts.Get(id);
            if (c == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return c;
        }

    
        [HttpPost]
        public Contact PersistContact(Contact contact)
        {
            Contact c = new Contact();
            //try
            //{
                c = _contacts.Add(contact);
            //}
            //catch (Exception ex)
            //{
            //    //TODO logging
            //}

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