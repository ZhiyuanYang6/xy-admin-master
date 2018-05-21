<template>
  <div class="header">
    <el-row :gutter="10">
      <!--Logo area-->
      <el-col :xs="10" :sm="10" :md="{span:18,offset:1}">
        <div class="logo">
          <span class="logo_prefix">{{$t('navbar.logu')}}</span>
          <span class="logo_suffix">{{$t('navbar.logd')}}</span>
        </div>
      </el-col>
      <el-col style="  cursor: pointer" :xs="2" :sm="2" :md="1">
        <lang-select class="international right-menu-item"></lang-select>
        <i class="el-icon-caret-bottom" style="color:#64D9D6"></i>
      </el-col>
      <el-col :xs="8" :sm="8" :md="3">
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span>
                <el-badge :value="3" class="sub item">
                  <i class="el-icon-date"></i></el-badge>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span class="pop-title">You have new tasks! </span>
              </el-dropdown-item>
              <el-dropdown-item v-for="task in tasks" :key="task.id" divided>
                <div class="task-div">
                  <span class="task-span task-tag">
                      <el-tag type="danger" v-if="task.rank==1">紧急</el-tag>
                      <el-tag type="warning" v-if="task.rank==2">重要</el-tag>
                      <el-tag type="success" v-if="task.rank==3">正常</el-tag>
                    </span>
                  <span class="task-span task-content">
                        {{task.content}}<br/><span class="task-time">截止：{{task.overTime}}</span>
                  </span>
                  <span class="task-span task-btn">
                      <el-button type="primary" size="mini">完成</el-button>
                    </span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="1">
        <div class="userName">{{userInfo.username}}</div>
        <div class="user-header">
          <el-dropdown trigger="click">
            <div class="avatar-wrapper">
              <img class="user-avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div class="setting-div">
                  <router-link to="/">
                    <span class="setting-icon">
                    <i class="icon iconfont icon-yonghu"></i>
                  </span>
                    <span class="setting-string"> {{$t('navbar.dashboard')}}</span>
                  </router-link>
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <div class="setting-div">
                  <span class="setting-icon"><i class="icon iconfont icon-shezhi"></i></span>
                  <span class="setting-string"> {{$t('navbar.setting')}}</span>
                </div>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <div class="setting-div" @click="logout">
                  <span class="setting-icon"><i class="icon iconfont icon-084tuichu"></i></span>
                  <span class="setting-string"> {{$t('navbar.logOut')}}</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { removeSession } from '@/utils/auth'
import LangSelect from '@/components/LangSelect'
export default {
  components: {
    LangSelect
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
  },
  data() {
    return {
      name: 'linxin',
      tasks: [
        { id: 1, rank: 1, content: '完成JSPangAdmin头部头部组件的编写。', overTime: '2017/3/9' },
        { id: 2, rank: 2, content: '完成GitHub仓库的初始化工作。', overTime: '2017/3/15' },
        { id: 3, rank: 3, content: '在阿里云进行网站备案，完成后通知组长。', overTime: '2017/3/20' }
      ],
    };
  },
  methods: {
    handleCommand(command) {
      console.log(command);
      this.$message('click on item ' + command);
    },
    logout() {
      this.$confirm('确定退出当前账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$globalApi.removeSessionStorage('session_key')   
        removeSession(); // 将token清空
        this.$globalApi.removeLocalStorage('AccountPassword'); // 将密码清空
        // this.$router.replace({ path: '/login' });
        this.$message({ type: 'success', message: '退出成功!' });
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      }).catch(() => {});
      // this.$store.dispatch('LogOut').then(() => {
      // });
    }
  },
}

</script>
<style lang="scss" scoped>
.header {
  //logo标题
  .logo {
    float: left;
    cursor: pointer;
    font-size: 22px;
    .logo_prefix {
      color: #209e91;
    }
    .logo_suffix {
      color: #fff;
    }
  } //中间下拉框
  .header-right {
    span {
      display: inline-block;
      margin-left: 30px;
      font-size: 18px;
      color: #fff;
      line-height: 1px;
      height: 18px;
      cursor: pointer;
    }
    span:hover {
      color: #209e91;
    }
  }
  .user-header {
    line-height: 10px;
    padding-top: 7px;
    font-size: 12px;
    img {
      cursor: pointer;
    }
  }
}

.task-div {
  clear: both;
  height: 55px;
  .task-span {
    display: block;
    float: left;
    font-size: 12px
  }
  .task-content {
    width: 160px;
    line-height: 16px;
    margin-left: 10px;
    padding: 5px;
    .task-time {
      clear: both;
      float: right;
      color: #ccc;
    }
  }
}

//用户设置
.setting-div {
  height: 30px;
  line-height: 30px;
  clear: both;
  span {
    display: block;
    float: left;
    font-size: 12px;
  }
  .setting-icon {
    padding-top: 0px;
    padding-right: 5px;
  }
}

//小标题
.pop-title {
  font-size: 12px;
  color: #209e91;
}

//头像
.avatar-wrapper {
  cursor: pointer;
  margin-top: 5px;
  position: relative;
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
  i {
    position: absolute;
    padding: 29px 5px 5px 44px;
    left: -0;
    top: 0;
    font-size: 12px;
    color: #ffffff;
  }
  i:hover {
    color: #64D9D6;
  }
}

//国际化
.international {
  cursor: pointer;
}

.userName {
  width: 100px;
  height: 1px;
  position: absolute;
  z-index: 2;
  color: #fff;
  right: 30px;
}

</style>
