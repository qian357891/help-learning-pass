import CryptoJS from 'crypto-js'
// 需要加密的数据
// const dataHex = CryptoJS.enc.Utf8.parse('123')
// 秘钥
// const keyHex = CryptoJS.enc.Utf8.parse('xxlzqqlzxqkyzhwj')
type WordArray = CryptoJS.lib.WordArray

const getHexData = (data: string) => {
  return CryptoJS.enc.Utf8.parse(data)
}

const getHexPass = (dataHex: WordArray, keyHex: WordArray) => {
  return CryptoJS.AES.encrypt(dataHex, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
}
// console.log(
//   getHexPass(CryptoJS.enc.Utf8.parse('123'), CryptoJS.enc.Utf8.parse('xxlzqqlzxqkyzhwj')).toString()
// )

export { getHexPass, getHexData }
export type { WordArray }
