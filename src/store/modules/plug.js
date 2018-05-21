const plug = {
  state: {
    jqbjtreedata: '',
  },
  mutations: {
    GETTREE: (state, data) => { //格式化树结构
      let items = { yclx: '', ycid: "", ycmc: '', ycsl: '', children: [] };
      let splx = [];
      state.jqbjtreedata = [];
      for (let i = 0; i < data.length; i++) {
        var aa1 = splx.find((item) => {
          return item === data[i].yclx;
        });
        if (!aa1) {
          splx.push(data[i].yclx);
          items = {
            ycid: data[i].ycid,
            yclx: data[i].yclx,
            ycmc: data[i].ycmc,
            ycsl: data[i].ycsl,
            children: [
              { ycid: data[i].ycid, yclx: data[i].yclx, ycmc: data[i].ycmc, ycsl: data[i].ycsl, }
            ]
          };
          state.jqbjtreedata.push(items);
        } else {
          for (let n = 0; n < state.jqbjtreedata.length; n++) {
            if (state.jqbjtreedata[n].yclx == data[i].yclx) state.jqbjtreedata[n].children.push({ ycid: data[i].ycid, yclx: data[i].yclx, ycmc: data[i].ycmc, ycsl: data[i].ycsl, });
          }
        }
      }
    },
    COPYFUNC: (state, originObj) => {
      let copyObj = {};
      for (let key in originObj) {
        copyObj[key] = originObj[key];
      }
      return copyObj;
    },
  },
  actions: {
    getTrees({ commit, state }, date) { //格式化树结构
      commit('GETTREE', date);
    },
  }
};

export default plug;
