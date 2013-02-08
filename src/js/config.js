define({

  /*
   * Page title format string. The format string will be passed through
   * utils.format() and can therefore contain one '%' (percent) character
   * which represent the current route's page title extension.
   */
  pageTitle: "% - Movie Database",

  /*
   * This fallback will be used when the current route does not define a
   * page title.
   */
  pageTitleFallback: "Movie Database",

  /*
   * The maximum time a notification is visible in milliseconds
   */
  notificationVisibilityTime: 5000,

  templatePath: {
    /*
     * Path to the HTML templates that are used by controllers.
     * angularUtils.defineController() is making use of this configuration
     * option for controller definition.
     */
    partials: "/templates/partials/",

    /*
     * Path to directives' templates. These templates are generally
     * referenced in a directive config's templateUrl property.
     */
    directives: "/templates/directives/"
  },

  /*
   * Set this option to true for additional checks of parameters and other
   * values. This comes in handy during development and for test and staging
   * environments. For production though, you might want to deactivate this
   * option as exceptions are unlikely to help your users. Also: Deactivating
   * this will give you a tiny performance boost. Among others, assert*
   * functions in the *utils* module rely on this option.
   */
  enableAssertions: true,

  /*
   * The web service endpoint which you want to use. Generally, service
   * modules are going to rely on this option.
   */
  endpoint: "http://localhost:8080",

  /*
   * Through this configuration optional additional functions will become
   * callable. Please note: This setting *must* always be deactivated
   * for production and should almost always be deactivated during development.
   *
   * This option is automatically set to true during unit testing to access
   * additional functions through which the application's state can be reset.
   * Depending on your problem, you may find it useful to set this to true
   * for debugging purposes.
   */
  unitTestMode: false
});
