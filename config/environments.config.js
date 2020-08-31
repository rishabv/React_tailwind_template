// Here is where you can define configuration overrides based on the execution environment.
// Supply a key to the default export matching the NODE_ENV that you wish to target, and
// the base configuration will apply your overrides before exporting itself.
module.exports = {
    // ======================================================
    // Overrides when NODE_ENV === 'development'
    // ======================================================
    development : (config) => ({
        compiler_public_path : `http://${config.server_host_name}:${config.server_port}/`,
        api: 'https://dev1.localsurveyorsdirect.co.uk', //process.env.API_ENDPOINT,
        googleMapKey: process.env.GOOGLEMAP_KEY, 
    }),

    // ======================================================
    // Overrides when NODE_ENV === 'staging'
    // ======================================================
    staging: (config) => ({
        compiler_public_path     : '/',
        compiler_fail_on_warning : false,
        compiler_hash_type       : 'hash',
        compiler_devtool         : false,
        compiler_stats           : {
            chunks       : true,
            chunkModules : true,
            colors       : true
        },
        api: 'https://dev1.localsurveyorsdirect.co.uk',
        googleMapKey: 'AIzaSyAU_Di5fPTtapJB2vP_HVSMGDaO0wn5Qww',
        server_host_name: 'dev1.localsurveyorsdirect.co.uk',
        server_port: 80
    }),
    // ======================================================
    // Overrides when NODE_ENV === 'production'
    // ======================================================
    production : (config) => ({
        compiler_public_path     : '/',
        compiler_fail_on_warning : false,
        compiler_hash_type       : 'hash',
        compiler_devtool         : false,
        compiler_stats           : {
            chunks       : true,
            chunkModules : true,
            colors       : true
        },
        api: 'https://api.localsurveyorsdirect.co.uk',
        googleMapKey: 'AIzaSyAU_Di5fPTtapJB2vP_HVSMGDaO0wn5Qww',
        server_host_name: 'members.localsurveyorsdirect.co.uk',
        server_port: 80
    })
};
