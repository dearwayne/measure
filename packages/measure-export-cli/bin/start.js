/**
 * @file run
 * @author Cuttle Cong
 * @date 2018/9/16
 *
 */
const Me = require('measure-export')
const app = require('express')()

function start(opts) {
  opts = Object.assign(
    {
      port: 8888
    },
    opts
  )
  const me = Me(
    Object.assign(
      {
        compilationSuccessInfo: {
          messages: [`Measure UI is running here http://localhost:${opts.port}`]
          // notes: ['Some additionnal notes to be displayed unpon successful compilation']
        }
      },
      opts
    )
  )
  process.on('SIGINT', () => {
    me.quit()
    require('./update-notify')()
    process.exit()
  })
  return me.getMiddlewares().then(({ dev, hot }) => {
    dev && app.use(dev)
    hot && app.use(hot)
    app.listen(opts.port)
    return app
  })
}

module.exports = start
