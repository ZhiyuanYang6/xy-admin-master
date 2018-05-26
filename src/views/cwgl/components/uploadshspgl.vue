<template>
  <div class="small">
    <el-form label-position="left" ref="formline" :model="formline" status-icon :rules="rules2" size="small" label-width="70px" 

:inline="true">
      <el-form-item label="商品编号">
        <el-input v-model="formline.spbh" style="width:250px;margin-right:10px;"></el-input>
      </el-form-item>
      <el-form-item label="" prop="spmc">
        <div class="dsfspbh">第三方商品编号</div>
        <el-input v-model="formline.dsfspbh" style="width:200px;"></el-input>
      </el-form-item>
      <el-form-item label="品牌分类">
        <el-select v-model="formline.yjfl" style="width:190px;" placeholder="大类" clearable @change="selet('dl',formline.yjfl)">
          <el-option v-for="item in yjfloptions" :key="item.value" :label="item.lmmc" :value="item.yjfl">
          </el-option>
        </el-select>
        <el-select v-model="formline.ejfl" style="width:190px;" placeholder="小类" clearable @change="selet('xl',formline.ejfl)">
          <el-option v-for="item in ejfloptions" :key="item.value" :label="item.lmmc" :value="item.ejfl">
          </el-option>
        </el-select>
        <el-select v-model="formline.pplmbm" style="width:190px;"  filterable
    allow-create placeholder="品牌" clearable>
          <el-option v-for="item in ppoptions4" :key="item.value" :label="item.lmmc" :value="item.pplmbm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="formline.spmc" style="width:250px;margin-right:20px;"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="formline.spdj" style="width:250px;"></el-input>
        <!-- <el-select v-model="formline.hblx" style="width:120px;" placeholder="货币类型" clearable>
          <el-option v-for="item in hblxoptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="formline.spgg" style="width:250px;"></el-input>
        <el-select v-model="formline.spdw" style="width:120px;" placeholder="单位" clearable>
          <el-option v-for="item in spdwoptions" :key="item.value" :label="item.valuename" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="保质期">
        <el-input v-model="formline.bzrq" style="width:250px;margin-right:300px;"></el-input>
      </el-form-item> -->
      <el-form-item label="缩略图">
        <div class="imglabe">
          <div class="box">
            <input id="slt" name="files" type="file" @change="handleFileChange('slt')" ref="inputerzt" />
            <label for="slt"></label>
            <img :src="detilslt.src" :class="{'ztimg':true,'ztimgshow':listrow.showzt}" />
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="详情图">
        <div class="imglabe">
          <div class="syeimage box" v-for="(item ,index) in detiltp">
            <span class="zzc"><i class="el-icon-delete"  @click="deleqxt(index)" style="left:50%;color: #ecececd9;"></i></span>
            <img :src="item.src" style="width:100%;height:100%;border-radius:4px;" />
          </div>
          <div class="box">
            <input id="xqt" name="files" type="file" @change="handleFileChange" ref="inputer" />
            <label for="xqt"></label>
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" style="width:600px;" v-model="formline.remark" :rows="5"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="subbtn">
          <el-button type="warning" @click="submitUpload('formline')">{{listrow.btn}}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from '@/utils/request'
import { Message } from 'element-ui';
import { mapGetters } from 'vuex'
export default {
  props: ['listrow', "dialogDetailVisible"],
  data() {

    var validspbh = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('内容不能为空'));
      } else {
        value = value.replace(/(^\s*)|(\s*$)/g, ''); //去首尾空格
        if (!value) return callback(new Error('内容不能为空'));
      }
      setTimeout(() => { callback(); }, 400);
    };
    var validspsj = (rule, value, callback) => {
      if (!value && value != 0) {
        return callback(new Error('商品售价不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value) && typeof value !== "number") {
          callback(new Error('请输入数字值'));

        } else {
          if (value <= 0) {
            callback(new Error('商品必须大于0'));
          }
          callback();
        }
      }, 400);
    };
    var validflid = (rule, value, callback) => {
      if (typeof value[1] !== "string") {
        return callback(new Error('分类品牌未选择'));
      }
      setTimeout(() => {
        callback();
      }, 400);
    };
    return {
      spdwoptions: [],
      hblxoptions: [],
      yjfloptions: [],
      ejfloptions: [],
      ppoptions4: [],
      formInline: {},
       xhadd: [], //已有的图片序号
       oldxhadd: [], //已有的图片序号
       xgxh: [], //修改的图片序号
      formline: {
        spbh: '',
        spmc: '001',
        remark: '000',
        flid: [],
        //xh: '',
        slt: "",
        xqt: [],
        spdw:''
      },

      rules2: {
        spbh: [{ validator: validspbh, trigger: 'blur' }],
        spmc: [{ validator: validspbh, trigger: 'blur' }],
        spsj: [{ validator: validspsj, trigger: 'blur' }],
        flid: [{ validator: validflid, trigger: 'blur' }],
      },
      option: { //品牌分类
        arrbroad: [
        ],
        subclass: [
        ],
        brand: [
        ],
      },
      detiltp: [], //展示的详情图片
      detilslt: [], //展示的缩略图
      oldxqtp:[],
      xgtp:[],
      oldslt:"",
    };

  },
  created: function() {
    this.initialize();
  },
  computed: {
    ...mapGetters([
      'imgurl'
    ]),

  },
  watch: {
    dialogDetailVisible: function(data, olddata) {
      if (data) {
          this.detiltp = []; //详情图
          this.detilslt= [], //展示的缩略图
        this.$refs['formline'].resetFields();
        this.initialize();
      }
    },
    yjfloptions: function(data, olddata) {
      //this.formInline = this.listrow;
      //console.log(this.formInline.qyid);

      if (this.formline.yjfl != null) {
        this.selet('dl', this.formline.yjfl)
      };
    },
    ejfloptions: function(data, olddata) {
      //  debugger;
      if (this.formline.ejfl != null) {
        this.selet('xl', this.formline.ejfl)
      };
      // this.form.xlid = this.form.xlid ? this.form.xlid : '';
      //console.log(this.form.xlid);
    }
  },
  methods: {
    submitUpload(formName) { //提交表单
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.listrow.btn == "修改") {
            this.updatespxx();
          } else this.subimage();
        } else {
          this.$message({ message: '表单验证未通过', type: 'error' });
          return false;
        }
      });
    },

    handleFileChange(value) { //监听图片上传模块状态改变  
      var inputDOM;
      if (value == "slt") {
        inputDOM = this.$refs.inputerzt;
        if (this.imgvalidator(inputDOM.files[0])) return;
        this.formline.slt = inputDOM.files[0];
      } else {
        inputDOM = this.$refs.inputer;
        if (this.imgvalidator(inputDOM.files[0])) return;
        this.formline.xqt.push(inputDOM.files[0]); // 通过DOM取文件数
      }

      this.imgPreview(inputDOM.files[0], value); //显示上传的图片
    },
    imgPreview(file, value) { //用base64展现图片
      if (!file || !window.FileReader) return; // 看支持不支持FileReader
      if (/^image/.test(file.type)) {
        var reader = new FileReader(); // 创建一个reader
        reader.readAsDataURL(file); // 将图片将转成 base64 格式
        reader.onloadend = () => { // 读取成功后的回调
          var listimage = { "src": reader.result, "name": file.name }
          if (value == "slt") {
            this.listrow.showzt = true;
            this.detilslt = listimage;
          } else {
            this.detiltp.push(listimage);
          }
        }
      }
    },

    imgvalidator(file) { //图片验证规则
      if (!file) {
        this.$message({ message: '选择图片为空', type: 'warning' });
        return false;
      } else if (file.size / 1024 > 500) { ///////////////////////////设置图片上传大小
        this.$message({ message: '图片不能超过500KB', type: 'warning' });
        return true;
      } else if (this.detiltp.length >= 5) { ////////////////////////////////////设置图片上传张数
        this.$message({ message: '详情图最多上传5张', type: 'warning' });
        return true;
      } else {
        return false;
      }
    },
    deleqxt(index) { //////////////////////图片删除
      if (this.listrow.btn == "修改") {
         this.formline.xqt.splice(index, 1);
        this.detiltp.splice(index, 1);
        this.xhadd.splice(index + 1, 1);
      } else {
        this.formline.xqt.splice(index, 1);
        this.detiltp.splice(index, 1);
      }
    },
    selet(val, id) {
      if (val == "dl") { //大类
        var query = { lmbm: id };
        var url = 'service-goods/goods/queryShejfl';
      } else if (val == 'xl') { //小类
        var query = { lmbm: id };
        var url = 'service-goods/goods/queryShpplmbm';
      } else {
        var url = 'service-goods/goods/queryShflxx';

      }
      request({ url: url, method: 'post', data: query }).then(response => {
        if (val == "dl") { //请求线路opt
          this.loading = false;
          // this.formline.ejfl.label='';
          this.ejfloptions = response;
        } else if (val == 'xl') { //请求点位opt
          this.loading = false;
          this.ppoptions4 = response;
        } else {
          this.loading = false;
          this.yjfloptions = response;
        }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },
    dictSelect(type, valuename) {
      var queryType = { type: type };
      request({ url: 'service-goods/goods/querySjzd', method: 'post', data: queryType }).then(response => {
        if (valuename == 'hblxoptions') { this.hblxoptions = response; }
        if (valuename == 'spdwoptions') { this.spdwoptions = response; }
      }).catch(error => {
        Message.error("error：" + "请检查网络是否连接");
      });
    },


    subimage() { //添加商品
      var formdata1 = new FormData();
      formdata1.append('sltimg', this.formline.slt);
      //缩略图
      for (var i = 0; i < this.formline.xqt.length; i++) { //详情图
        formdata1.append('xqtimg', this.formline.xqt[i]);
      }
      formdata1.append('spbh', this.formline.spbh);
      formdata1.append('spgg', this.formline.spgg);
      formdata1.append('spmc', this.formline.spmc);
      formdata1.append('spjg', this.formline.spdj);
      formdata1.append('yjfl', this.formline.yjfl);
      formdata1.append('dsfspbh', this.formline.dsfspbh);
      formdata1.append('ejfl', this.formline.ejfl);
      formdata1.append('pplmbm', this.formline.pplmbm);
      formdata1.append('spdw', this.formline.spdw);
      formdata1.append('remark', this.formline.remark);
      console.log(formdata1)
      request({ url: 'service-goods/goods/insetShGoods', method: 'post', data: formdata1 }).then(response => {
        // this.ADSubmit();
       // debugger;
        this.dialogDetailVisible=false;
        console.log(response);
        this.$message({ message: '商品添加成功', type: 'success' });
         this.ADSubmit();
      }).catch((error) => {
         this.$message({ message: '商品添加失败', type: 'false' });
      })
    },
    updatespxx() { //修改商品
      var formdata1 = new FormData();
      formdata1.append('sltimg', this.formline.slt); //缩略图
      this.xgxh=[];
       for (var i = 1; i < this.oldxhadd.length; i++) {
      var xhxthas =  this.xhadd.indexOf(this.oldxhadd[i],0);
                  if (xhxthas==-1) {
                    this.xgxh.push(this.oldxhadd[i])
                  }
            }
            this.xgtp=[];
            for (var i = 0; i < this.oldxqtp.length; i++) {
            var xhxthas =  this.detiltp.indexOf(this.oldxqtp[i],0);
                  if (xhxthas==-1) {
                   // this.oldxqtp[i].src=encodeURI(this.this.oldxqtp[i].src);
                    this.xgtp.push(this.oldxqtp[i].src.substring(this.imgurl.length))
                  }
            }
            debugger;
           // this.xgtp.push(JSON.stringify(this.oldslt));
      for (var i = 0; i < this.formline.xqt.length; i++) { //详情图
        formdata1.append('xqtimg', this.formline.xqt[i]);
      }
      formdata1.append('remark', this.formline.remark);
      formdata1.append('spid', this.listrow.spid);
      formdata1.append('shid', this.listrow.shbh);
      formdata1.append('spbh', this.formline.spbh);
      formdata1.append('spgg', this.formline.spgg);
      formdata1.append('spmc', this.formline.spmc);
      formdata1.append('spjg', this.formline.spdj);
      formdata1.append('yjfl', this.formline.yjfl);
      formdata1.append('dsfspbh', this.formline.dsfspbh);
      formdata1.append('ejfl', this.formline.ejfl);
      formdata1.append('pplmbm', this.formline.pplmbm);
      formdata1.append('spdw', this.formline.spdw);
      formdata1.append("xh",this.xgxh);
      formdata1.append("oldxh",this.oldxhadd);
      formdata1.append("sctp",this.xgtp);
      formdata1.append("sltp",this.oldslt.substring(this.imgurl.length));
      request({ url: 'service-goods/goods/editSpxx', method: 'post', data: formdata1 }).then(response => {
        this.$message({ message: '商品修改成功', type: 'success' });
        this.ADSubmit();
      }).catch((error) => {
        this.$message({ message: '商品修改失败', type: 'error' });
        //this.ADSubmit();
      })
    },
    initialize() { ////////////////////////进入初始化
      this.selet();

      this.dictSelect('1022', 'spdwoptions');
      if (this.listrow.btn == "修改") {
                this.listrow.showzt = true; //主图展示
          this.detilslt = []; //商品详情图初始化
        request({ url: "service-goods/goods/queryEditSpxx", method: 'post', data: { spid: this.listrow.spid } }).then(response => {

          this.response = false;
          this.formline = response;
                    debugger;//添加展示的详情图

          this.selet('dl', this.formline.yjfl);
          //this.selet('xl', this.formline.ejfl)
          console.log(response.smartimglj);
          this.detilslt.src = this.imgurl+response.smartimglj; //展示的主图
          this.xhadd = ["1"];
           this.oldxhadd = ["1"];
          this.formline.xqt = []; //详情图
           this.oldxqtp=[];
           this.oldslt="";
          this.detiltp = []; //详情图展示
          for (var i = 1; i < response.fjxx.length; i++) { 
          debugger;//添加展示的详情图
            var src = this.imgurl+response.fjxx[i].fjlj;
            //var xh = this.listrow.xqtpurl[i].split(",")[1];
            var itemxqimg = { "src": src, "xh": response.fjxx[i].fjxh };
            this.detiltp.push(itemxqimg);
            this.xhadd.push(response.fjxx[i].fjxh);
             this.oldxhadd.push(response.fjxx[i].fjxh);
             this.oldxqtp.push(itemxqimg);
             this.oldslt=response.smartimglj;
           // this.fileimg.push(itemxqimg); //添加上传的详情图
          }

        })

      } else {
        this.listrow.showzt = false; //主图展示
        this.detilslt = ''; //缩略图展示
        // this.formline = []; 
        this.formline = {
          dsfspbh: this.listrow.dsfspbh,
          spbh: this.listrow.spbh,
          slt: '', //缩略图
          xqt: [] //详情图
        }
      }
    },
    ADSubmit() {
      this.$emit("dialog1Changed", 0); //发送参数到父组件 事件名，参数
    },
  }
}

</script>
<style scoped>
.small {
  padding-top: 10px;
}

hr {
  margin-top: 5px;
}

div.el-form-item {
  margin-bottom: 15px;
}

.dsfspbh {
  float: left;
  margin-right: 15px;
}

.subbtn {
  width: 670px;
}

.subbtn .el-button--small {
  float: right;
}

.upimage {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.box {
  position: relative;
  float: left;
  width: 90px;
  height: 100px;
  border: 1px dashed #C0CCDA;
  border-radius: 5px;
  background: #FBFDFF;
  margin-right: 20px;
}

.upimage .box:hover {
  border: 1px dashed #409EFF;
}

input {
  position: absolute;
  left: -9999px;
}

label {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  /*cursor: not-allowed;*/
}

div.box i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  color: #8c939d;
}

.syeimage {
  border: 1px solid #C0CCDA;
  margin-right: 10px;
  margin-bottom: 10px;
}


.zzc {
  border-radius: 10px;
  background: #0000004d;
  z-index: 11;
  text-align: center;
  font-size: 20px;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: block;
  position: absolute;
}

span.zzc:hover {
  opacity: 1;
}

span.zzc i {
  cursor: pointer;
}

.ztimg {
  position: absolute;
  transition: opacity 2s, top 1s;
  opacity: 0;
  top: -60px;
  left: -2px;
  width: 100px;
  height: 100px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
}

div img.ztimgshow {
  opacity: 1;
  top: -1px;
  z-index: 1;
}

.sltshow {
  opacity: 0.1;
}

.ztsz {
  position: relative;
  height: 180px;
}

div.tpmc {
  position: relative;
  top: 40px;
  left: 150px;
}

.iconfont {
  height: 60px;
  width: 60px;
}

</style>
