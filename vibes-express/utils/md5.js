const crypto = require('crypto')

/**
 * MD5
 * 相同的明文加密后的密文是一样的，可以通过爆破和撞库来破解
 *  - 可以通过添加一个前缀，或者将返回的密文再次加密
 */

// const crypytoed = crypto
//   .createHash('md5')
//   .update('vibes' + '1231234')
//   .digest('hex')
// console.log(crypytoed)

module.exports = (plaintext) => {
  return crypto
    .createHash('md5') // 加密方式
    .update('vibes' + plaintext) // 需要加密的明文，【vibes】是一个自定义的前缀，可以降低被爆破和撞库的风险
    .digest('hex') // 通过方式进行返回密文， hex: 十六进制
}
