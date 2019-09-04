const config = {
  dev: {
    database: 'mongodb://localhost/cocktails'
  },
  test: {
    database: 'mongodb://localhost/test_shaky'
  },
  gitlab: {
    database: 'mongodb://mongo/cocktails'
  },
  production: {
    database: 'mongodb://localhost/cocktails'
  }
}

module.exports.get = (env) => {
  console.log('ENV: ' + env)
  return config[env]
}
