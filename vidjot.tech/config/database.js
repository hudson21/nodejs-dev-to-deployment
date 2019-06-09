if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://hudson21:9512GOld@ds133137.mlab.com:33137/vidjot-prod'
    }
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/vidjot-dev'
    };
}
