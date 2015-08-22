// this is needed because it *looks* like karma wants an absolute
// path to the conf file
import {resolve} from 'path';

const karmaConfigPath = resolve('.') + '/karma.conf.js';

export default {
    source: './src',
    dist: './dist',
    example: './example',
    importance: 'patch',
    test: {
        karma: karmaConfigPath
    }
};
