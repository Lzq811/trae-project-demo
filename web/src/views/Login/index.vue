<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock, Key } from '@element-plus/icons-vue'
import { RSA_ENCRYPT_2048 } from '@/utils/Rsa'
import { reqCaptcha, reqLogin } from '@/api/modules/auth'
import { passwordRegex } from '@/utils/Rexp'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)

// 验证码图片
const captchaUrl = ref('')
const captchaKey = ref('')

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  captcha: ''
})
const validatePwd = (_rule: any, value: string, callback: any) => {
  if (!passwordRegex.test(value)) {
    callback(new Error('密码必须包含字母、数字和特殊字符'))
  } else {
    callback()
  }
}
// 表单校验规则
const loginRules = reactive<FormRules<typeof loginForm>>({
  username: [{ required: true, message: '请输入账户', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePwd, message: '密码必须包含字母、数字和特殊字符', trigger: 'blur' }
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

// 获取验证码
const getCaptcha = async () => {
  try {
    const { code: number, verifyCode, t }: any = await reqCaptcha()
    if (number === '10000') {
      captchaUrl.value = verifyCode
      captchaKey.value = t
    }
  } catch (error) {
    console.error('获取验证码失败', error)
  }
}

// 登录处理
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 加密账户和密码
        const encryptedUsername = RSA_ENCRYPT_2048(loginForm.username)
        const encryptedPassword = RSA_ENCRYPT_2048(loginForm.password)

        if (!encryptedUsername || !encryptedPassword) {
          ElMessage.error('加密失败，请重试')
          loading.value = false
          return
        }
        const params = {
          username: encryptedUsername,
          password: encryptedPassword,
          verifyCode: loginForm.captcha,
          t: captchaKey.value,
          verify: 3
        }

        const { code }: any = await reqLogin(params)

        if (code === '10000') {
          ElMessage.success('登录成功')
          // 存储 token 等信息
          // localStorage.setItem('token', responseData.token)

          // 处理记住密码
          /* if (rememberMe.value) {
            localStorage.setItem('remembered_username', loginForm.username)
            localStorage.setItem('remembered_password', loginForm.password) // 注意：实际生产中不建议明文存储密码
          } else {
            localStorage.removeItem('remembered_username')
            localStorage.removeItem('remembered_password')
          } */

          // 跳转首页
          router.push('/workbench')
        } else {
          // 登录失败刷新验证码
          getCaptcha()
        }
      } catch (error) {
        console.error('登录异常', error)
        getCaptcha()
      } finally {
        loading.value = false
      }
    }
  })
}

// 忘记密码处理
const handleForgotPassword = () => {
  ElMessage.info('请联系管理员获取密码')
}

onMounted(() => {
  getCaptcha()

  // 恢复记住的账号密码
  const savedUsername = localStorage.getItem('remembered_username')
  const savedPassword = localStorage.getItem('remembered_password')
  if (savedUsername && savedPassword) {
    loginForm.username = savedUsername
    loginForm.password = savedPassword
    rememberMe.value = true
  }
})
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>系统登录</h2>
        <p>欢迎使用科学转化平台</p>
      </div>

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        size="large"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账户" :prefix-icon="User" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>

        <el-form-item prop="captcha">
          <div class="captcha-container">
            <el-input
              v-model="loginForm.captcha"
              placeholder="验证码"
              :prefix-icon="Key"
              class="captcha-input"
              @keyup.enter="handleLogin(loginFormRef)"
            />
            <div class="captcha-img" @click="getCaptcha">
              <img v-if="captchaUrl" :src="captchaUrl" alt="验证码" title="点击刷新" />
              <span v-else>加载中...</span>
            </div>
          </div>
        </el-form-item>

        <div class="form-options">
          <el-checkbox v-model="rememberMe">记住密码</el-checkbox>
          <el-button link type="primary" @click="handleForgotPassword">忘记密码？</el-button>
        </div>

        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="handleLogin(loginFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
}

.login-box {
  width: 400px;
  padding: 40px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .login-header {
    text-align: center;
    margin-bottom: 40px;

    h2 {
      margin: 0 0 10px;
      font-size: 24px;
      color: #333;
    }

    p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
  }

  .captcha-container {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;

    .captcha-input {
      flex: 1;
    }

    .captcha-img {
      width: 100px;
      height: 40px;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background-color: #f5f7fa;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      span {
        font-size: 12px;
        color: #909399;
      }
    }
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .login-btn {
    width: 100%;
    font-size: 16px;
    padding: 12px 0;
  }
}
</style>
