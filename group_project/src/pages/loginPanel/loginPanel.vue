<template>
    <div class="logindata">
        <div v-if="!accountValid" class="logintext">
            <h2>Welcome</h2>
        </div>
        <div v-else class="usertext">
            <h2>Welcome,<br>{{ username }}</h2>
        </div>
        <div v-if="!accountValid" class="formdata">
            <el-form ref="form" :model="form">
                <el-form-item prop="username">
                    <el-input v-model="form.accountNum" clearable placeholder="请输入账号"></el-input>
                    <p class="login" v-if="isLoginClick && this.isUsernameEmpty">Empty Username!</p>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" clearable placeholder="请输入密码" show-password></el-input>
                    <p class="login" v-if="isLoginClick && !accountValid">Wrong Password or Valid Username</p>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="!accountValid" class="tool">
            <div>
                <el-checkbox v-model="checked" @change="remember">记住密码</el-checkbox>
            </div>
            <div>
                <span class="shou" @click="forgetpas">忘记密码？</span>
            </div>
        </div>
        <div v-if="!accountValid" class="butt">
            <el-button type="primary" @click="loginClick">Login</el-button>
        </div>
    </div>
</template>

<script>


import { mapState } from "vuex";

export default {
    name: "loginPanel",
    data() {
        return {
            checked: false,
            isLoginClick: false,
        };
    },
    mounted() {
        if (localStorage.getItem("news")) {
            this.form = JSON.parse(localStorage.getItem("news"))
            this.checked = true
        }
    },
    methods: {
        loginClick() {


            this.$store.dispatch("login/loginCheck", () => {
                // 异步操作完成后的处理逻辑
                this.isLoginClick = !this.isLoginClick
                if (this.accountValid) {
                    console.log("A")
                    this.$store.dispatch("DataProcess/setUser", this.form.accountNum)
                    console.log(this.form)
                }
            })

        },
        remember(data) {
            this.checked = data
            if (this.checked) {
                localStorage.setItem("news", JSON.stringify(this.form))
            } else {
                localStorage.removeItem("news")
            }
        },
        forgetpas() {
            //TODO: 忘记密码逻辑
            this.$message({
                type: "info",
                showClose: true
            })
        },
    },
    computed: {
        ...mapState("login", {
            form: state => state.form,
            accountValid: state => state.accountValid,  //用vuex中的状态映射回来
        }),
        ...mapState("DataProcess", {
            username: state => state.userInfo.username
        }),
        isUsernameEmpty() {
            return this.form.username === null
        }
    },
};
</script>

<style scoped>
.loginbody {
    width: 100%;
    height: 100%;
    min-width: 1000px;
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
    background-repeat: no-repeat;
    position: fixed;
    line-height: 100%;
    padding-top: 150px;
}

.logintext {
    margin-bottom: 20px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    color: white;
    text-shadow: 2px 2px 4px #000000;
}

.usertext {
    font-size: 36px;
    color: #256bc7;
    font-family: 'Arial Black', Gadget, sans-serif;
    text-align: center;
    margin-top: 20px;
    text-shadow: 2px 2px 4px #000000;
}

.logindata {
    width: 400px;
    height: 300px;
    transform: translate(-50%);
    margin-left: 50%;
}

.tool {
    display: flex;
    justify-content: space-between;
    color: #606266;
}

.butt {
    margin-top: 10px;
    text-align: center;
}

.shou {
    cursor: pointer;
    color: #606266;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */</style>

