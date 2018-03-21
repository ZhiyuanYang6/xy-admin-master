//修改侧边栏显示状态sidebar语言类型language
const app = {
  state: {
    sidebar: {
      opened: !+sessionStorage.getItem('sidebarStatus')
    },
    language: sessionStorage.getItem('language') || 'zh'
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        sessionStorage.setItem('sidebarStatus', 1)
      } else {
        sessionStorage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      sessionStorage.setItem('language', language)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
