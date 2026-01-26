import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type Method
} from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { RSA_SIGN_2048 } from '@/utils/Rsa'

// 环境变量
const { VITE_APP_ID, VITE_API_BASE_URL, VITE_GATEWAY_PORT, VITE_ENV_FLAG } = import.meta.env
const API_SERVER_URL = `${VITE_API_BASE_URL}:${VITE_GATEWAY_PORT}` || ''
const APP_VERSION = VITE_ENV_FLAG || '1.0.0'

// 消息提示实例管理
let messageInstanceList: any[] = []

const showMessage = (msg: string, traceId?: string) => {
  const messageContent =
    traceId && traceId !== '00000000000000000000000000000000'
      ? `${msg}</br>问题跟踪码:${traceId}`
      : msg

  // @ts-ignore
  const instance = ElMessage({
    showClose: true,
    type: 'error',
    duration: 3000,
    message: messageContent,
    dangerouslyUseHTMLString: true,
    onClose: (instance: any) => {
      const index = messageInstanceList.findIndex((item) => item.id === instance.id)
      if (index !== -1) {
        messageInstanceList.splice(index, 1)
      }
    }
  })

  messageInstanceList.push(instance)

  // 限制最大消息数
  if (messageInstanceList.length >= 6) {
    messageInstanceList[0].close()
  }

  return instance
}

const service = axios.create({
  timeout: 5000,
  baseURL: API_SERVER_URL // 统一网关地址
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    config.headers['x-page-route'] = router.currentRoute.value.fullPath
    config.headers['x-page-timestamp'] = new Date().getTime()
    config.headers['X-App-Version'] = APP_VERSION
    config.headers['X-App-Id'] = VITE_APP_ID

    // 构造网关参数
    // 兼容逻辑：如果 url 是对象（旧代码习惯），则从中提取 method；否则假设 url 为 method 字符串
    // 注意：axios 类型定义 url 为 string，这里做一些兼容性处理或假设调用方遵循新规范

    let method = config.url || ''
    let bizContent = JSON.stringify(config.data || {})

    // 如果调用方式是 axios({ url: { method: '...', ... } }) 的非标准用法，需要在此适配
    // 鉴于 TS 限制，建议调用方改为 axios.post('method.name', { ...data })

    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')

    // 重组 data
    config.data = {
      charset: 'utf-8',
      biz_content: bizContent,
      method: method,
      format: 'json',
      sign: '',
      app_id: VITE_APP_ID,
      sign_type: 'RSA2',
      version: '1.0',
      timestamp: timestamp
    }

    // 计算签名
    config.data.sign = RSA_SIGN_2048(bizContent, method, timestamp)

    // 强制修正 url 为网关地址 (如果 baseURL 已设置，这里可以是空或者 '/')
    // 由于旧代码是 req.url = API_SERVER.default，这里假设 baseURL 已配置好
    config.url = ''
    config.method = 'post' // 网关通常使用 POST

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse) => {
    // 解析原始请求中的 method
    let method = ''
    try {
      const requestData =
        typeof res.config.data === 'string' ? JSON.parse(res.config.data) : res.config.data
      method = requestData.method || ''
    } catch (e) {
      console.error('Failed to parse request data', e)
    }

    const responseKey = `${method.replace(/\./g, '_')}_response`
    const responseData = res.data[responseKey]

    if (!responseData) {
      return res
    }

    const { code, sub_code, msg, sub_msg } = responseData
    const traceId = res.headers['x-trace-id']

    if (code === '10000') {
      // 成功，返回解包后的数据或原响应
      // 建议返回 responseData 或 res.data，视项目约定而定。这里保持返回 res 以兼容旧逻辑
      return responseData
    } else {
      // 登录失效
      if (sub_code === '-100' || res.status === 401) {
        localStorage.removeItem('token')
        router.push({ name: 'Login' }) // 确保路由名称正确
        return responseData
      }

      // 错误提示
      // 排除特定路由或情况（如旧代码中的 defaultRoute / AUTHORIZATION），此处简化处理
      const errorMsg = sub_msg || msg || '系统繁忙'
      showMessage(errorMsg.replace(/,/g, '，'), traceId)

      return responseData
    }
  },
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        router.push({ name: 'Login' })
      } else {
        const errorMsg = (error.response.data as any)?.message || '接口调用出错'
        showMessage(errorMsg)
      }
    }
    return Promise.reject(error)
  }
)

/**
 * 封装后的 HTTP 请求函数
 * @param url 网关接口方法名 (e.g. 'backend.org.ums.captcha.psw')
 * @param data 请求参数 (默认 {})
 * @param method HTTP 请求方法 (虽然网关通常走 POST，但保留此参数以兼容旧调用习惯，默认 'POST')
 */
const http = (url: string, data: any = {}, method: Method = 'POST') => {
  return service({
    url,
    data,
    method
  })
}

export default http
