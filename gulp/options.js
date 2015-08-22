import minimist from 'minimist';

/*
    Capture any args that might have been passed in
*/
var knownOptions = {
    string: 'env',
    'boolean': 'debug',
    'default': {
        env: process.env.NODE_ENV || 'development',
        debug: false
    }
};

export default minimist(process.argv.slice(2), knownOptions);
