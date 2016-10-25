using System;
using System.Web.Mvc;
using System.Web.Routing;

namespace ContactAppAngular.Utilities
{
    public static class Extensions
    {
        #region Url Extensions

        /// <summary>
        /// Create url to the action from api controller
        /// </summary>
        /// <param name="urlHelper">url helper</param>
        /// <param name="actionName">action name</param>
        /// <param name="controllerName">controller name</param>
        /// <param name="routeValues">route values</param>
        /// <returns>url</returns>
        public static string ApiAction(this UrlHelper urlHelper, string actionName, string controllerName = null, object routeValues = null)
        {
            var routeValuesDictionary = new RouteValueDictionary(routeValues) { { "httproute", string.Empty } };

            var url = urlHelper.Action(actionName, controllerName, routeValuesDictionary);

            if (string.IsNullOrEmpty(url)) return string.Empty;

           // url = url.Substring(url.IndexOf("api", StringComparison.InvariantCultureIgnoreCase));

            return url;
        }

        #endregion

        #region Html Extensions

        /// <summary>
        /// Create image tag
        /// </summary>
        /// <param name="helper">html helper</param>
        /// <param name="url">image url</param>
        /// <param name="altText">alt text</param>
        /// <param name="htmlAttributes">html attributes</param>
        /// <returns>image tag</returns>
        public static MvcHtmlString Image(this HtmlHelper helper, string url, string altText, object htmlAttributes)
        {
            TagBuilder builder = new TagBuilder("img");
            builder.Attributes.Add("src", url);
            builder.Attributes.Add("alt", altText);
            builder.MergeAttributes(new RouteValueDictionary(htmlAttributes));
            return MvcHtmlString.Create(builder.ToString(TagRenderMode.Normal));
        }

        #endregion

        #region Integer Extensions

        /// <summary>
        /// Call the action n times
        /// </summary>
        /// <param name="n">number of calls</param>
        /// <param name="action">action to call n times</param>
        public static void Times(this int n, Action<int> action)
        {
            if (action == null) throw new ArgumentNullException("action");

            for (var i = 0; i < n; i++)
            {
                action(i);
            }
        }

        /// <summary>
        /// Call the action n times
        /// </summary>
        /// <param name="n">number of calls</param>
        /// <param name="action">action to call n times, if it returns false => the loop will be stopped</param>
        public static void Times(this int n, Func<int, bool> action)
        {
            if (action == null) throw new ArgumentNullException("action");

            for (var i = 0; i < n; i++)
            {
                if (!action(i))
                {
                    break;
                }
            }
        }

        #endregion
    }
}
