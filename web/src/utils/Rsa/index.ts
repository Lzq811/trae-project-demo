import JSEncrypt from 'jsencrypt'
import jsrsasign from 'jsrsasign'
import { prodPublicKey, testPublicKey, testPrivateKey, prodPrivateKey } from './keys'
const { VITE_ENV_FLAG, VITE_APP_ID } = import.meta.env

let publicKey: string = ''
let privateKey: string = ''
if (VITE_ENV_FLAG === 'prod') {
  publicKey = prodPublicKey
  privateKey = prodPrivateKey
} else {
  publicKey = testPublicKey
  privateKey = testPrivateKey
}

export const RSA_SIGN_2048 = (val: string, method: string, time: string) => {
  // 此处操作与后端约定参数
  const app_id = `app_id=${VITE_APP_ID}&biz_content=${val}&charset=utf-8&format=json&method=${method}&sign_type=RSA2&timestamp=${time}&version=1.0`
  // 创建RSAKey对象
  // let rsa = new jsrsasign.RSAKey()

  // 将密钥转码
  const rsa = jsrsasign.KEYUTIL.getKey(privateKey)

  // 创建Signature对象，设置签名编码算法
  const sig = new jsrsasign.KJUR.crypto.Signature({ alg: 'SHA256withRSA' })

  // 初始化
  sig.init(rsa)

  // 传入待加密字符串
  sig.updateString(app_id)

  // 生成密文
  const sign = jsrsasign.hextob64(sig.sign())

  return sign
}

// 登录时候 加密 账号密码使用
export const RSA_ENCRYPT_2048 = (str = '') => {
  const encrypt = new JSEncrypt({
    default_key_size: '2048'
  })
  encrypt.setPublicKey(publicKey)
  const encrypted = encrypt.encrypt(str)
  return encrypted
}
