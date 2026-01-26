/**
 * 认证模块
 * 包含用户登录、验证码、注册、注销/退出等操作、用户数据权限、按钮权限、菜单权限等内容；
 */
import http from '@/api/http'

// 获取验证码
const reqCaptcha = (params: any = {}) => http('backend.org.ums.captcha.psw', params, 'POST')

// 登录
const reqLogin = (params: any = {}) => http('backend.org.ums.user.login', params, 'POST')

export { reqCaptcha, reqLogin }
