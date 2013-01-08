define({
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
  endpoint: "http://localhost:8080/moviedatabase",

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
  unitTestModus: false
});