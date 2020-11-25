module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/coasters', require('./coaster.routes'))
    app.use('/parks', require('./park.routes'))
}
