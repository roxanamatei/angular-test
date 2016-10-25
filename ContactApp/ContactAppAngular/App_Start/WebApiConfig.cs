using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Routing;

namespace ContactAppAngular
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "DefaultApi", 
                "api/{controller}/{action}/{id}",
                defaults: new {
                    id = RouteParameter.Optional }
                );

            config.Routes.MapHttpRoute(
               name: "DefaultContactApi",
               routeTemplate: "Contact/api/{controller}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );

            RouteTable.Routes.MapHttpRoute(
              name: "GetContacts",
              routeTemplate: "Contact/api/Contacts",
              defaults: new { controller = "Contacts" }
          );

            // Uncomment the following line of code to enable query support for actions with an IQueryable or IQueryable<T> return type.
            // To avoid processing unexpected or malicious queries, use the validation settings on QueryableAttribute to validate incoming queries.
            // For more information, visit http://go.microsoft.com/fwlink/?LinkId=279712.
            //config.EnableQuerySupport();
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(
               config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml"));

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            json.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Local;

        }
    }
}