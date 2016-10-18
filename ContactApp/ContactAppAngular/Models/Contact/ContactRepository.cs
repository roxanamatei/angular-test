using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace ContactAppAngular.Models
{
    public interface IContactRepository
    {
        IEnumerable<Contact> GetAll();
        Contact Get(int id);
        Contact Add(Contact item);
        void Remove(int id);
        bool Update(Contact item);
    }
    public class ContactRepository : IContactRepository
    {
        private readonly ContactContext _db;

        public ContactRepository()
        {
            _db = new ContactContext();
        }

        public IEnumerable<Contact> GetAll()
        {
            return _db.Contacts;
        }

        public Contact Get(int id)
        {
            return _db.Contacts.Find(id);
        }

        public Contact Add(Contact contact)
        {
            _db.Contacts.Add(contact);
            _db.SaveChanges();
            return contact;
        }

        public void Remove(int id)
        {
            Contact contact = _db.Contacts.Find(id);
            _db.Contacts.Remove(contact);
            _db.SaveChanges();
        }

        public bool Update(Contact item)
        {
            Contact newContact = _db.Contacts.Find(item.Id);
            if (newContact == null)
                return false;

            newContact.Email = item.Email;
            newContact.FirstName = item.FirstName;
            newContact.LastName = item.LastName;
            newContact.Description = item.Description;
            newContact.Birthay = item.Birthay;
            newContact.Gender = item.Gender;
            newContact.PhoneNumber = item.PhoneNumber;

            _db.SaveChanges();
            return true;
        }

    }
}