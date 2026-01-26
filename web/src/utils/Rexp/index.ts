/**
 * 常用正则表达式集合
 */

/**
 * 手机号码
 * 规则：1开头，第二位3-9，后面9位数字
 */
export const mobileRegex = /^1[3-9]\d{9}$/

/**
 * 电子邮箱
 */
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

/**
 * 身份证号码 (15位或18位)
 * 规则：
 * 15位：全数字
 * 18位：前17位数字，最后一位可能是数字或X/x
 */
export const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

/**
 * 统一社会信用代码
 * 规则：18位，由数字和大写英文字母组成，不包含 I, O, Z, S, V
 */
export const socialCreditCodeRegex = /^[0-9A-HJ-NPQRTUWXY]{18}$/

/**
 * 密码强度
 * 规则：字母+数字，6-20位
 */
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&.～、,:;+–=_^：；。，？！￥~·_—`\\|/-])[A-Za-z\d$@$!%*?&#.～、,:;+–=_^：；。，？！￥~·_—`\\|/-]{8,30}/

/**
 * URL 链接
 */
export const urlRegex =
  /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

/**
 * 座机号码
 * 规则：xxx-xxxxxxx 或 xxxx-xxxxxxx
 */
export const landlineRegex = /^(\d{3,4}-)?\d{7,8}$/

/**
 * 邮政编码
 */
export const postalCodeRegex = /^[1-9]\d{5}$/

/**
 * 纯数字
 */
export const numberRegex = /^[0-9]*$/

/**
 * 校验辅助函数
 */
export const isMobile = (val: string): boolean => mobileRegex.test(val)
export const isEmail = (val: string): boolean => emailRegex.test(val)
export const isIdCard = (val: string): boolean => idCardRegex.test(val)
export const isSocialCreditCode = (val: string): boolean => socialCreditCodeRegex.test(val)
export const isURL = (val: string): boolean => urlRegex.test(val)
