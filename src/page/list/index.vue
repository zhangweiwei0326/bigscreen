<template>
  <el-container class="list">
    <el-header>
      <el-menu :default-active="activeName"
               mode="horizontal"
               background-color="#171b22"
               text-color="#fff"
               active-text-color="#00baff"
               @select="handleSelect">
        <el-menu-item :index="item.categoryValue"
                      :key="item.categoryValue"
                      v-for="item in typelist"
                      @click="getList(item.categoryValue)">
          <i class="iconfont icon-daping"></i>
          {{item.categoryKey}}
        </el-menu-item>
      </el-menu>

    </el-header>
    <el-main>
      <div class="page">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-size="page.size"
                       :current-page.sync="page.page"
                       :total="page.total">
        </el-pagination>
      </div>
      <div class="content">
        <div class="content__item content__item--add"
             @click="handleAdd">
          <div>
            <i class="el-icon-plus"></i>
            <p>新建大屏</p>
          </div>
        </div>
        <div class="content__item"
             v-for="(item,index) in list"
             :key="index"
             @mouseover="item._menu=true"
             @mouseout="item._menu=false">
          <div class="content__info">
            <img v-if="item.backgroundUrl"
                 :src="item.backgroundUrl"
                 alt="" />
            <div class="content__menu"
                 v-show="item._menu">
              <div class="content__btn"
                   @click="handleEdit(item)" v-if="hasAuth">
                编辑
              </div>
            </div>
          </div>
          <div class="content__main">
            <span class="content__name">{{item.title}}</span>
            <div class="content__menulist">
              <div class="content__view">
                <el-tooltip content="删除" v-if="hasAuth">
                  <i class="el-icon-delete"
                     @click="handleDel(item,index)"></i>
                </el-tooltip>
                <el-tooltip content="编辑" v-if="hasAuth">
                  <i class="el-icon-edit"
                     @click="handleUpdate(item,index)"></i>
                </el-tooltip>
                <el-tooltip content="预览">
                  <i class="el-icon-view"
                     @click="handleViews(item,index)"></i>
                </el-tooltip>
                <el-tooltip content="复制">
                  <i class="el-icon-copy-document"
                     @click="handleCopy(item,index)"></i>
                </el-tooltip>
              </div>
              <!-- <span class="content__status"
                    :class="{'content__status--active':item.status}">
                {{item.status?'已发布':'未发布'}}
              </span> -->
            </div>

          </div>
        </div>
      </div>
    </el-main>
    <el-dialog title="新建大屏"
               width="35%"
               :visible.sync="box">
      <avue-form :option="option"
                 v-model="form"
                 @submit="handleSave"></avue-form>
    </el-dialog>
  </el-container>
</template>
<script>
import { getList, addObj, updateObj, delObj, getCategory, copyObj } from '@/api/visual';
import jwt from "jsonwebtoken";
export default {
  name: "list",
  data () {
    return {
      typelist: [],
      index: 0,
      type: '',
      option: {
        column: [{
          label: '分组',
          prop: 'category',
          span: 24,
          labelWidth: 100,
          type: 'select',
          dicUrl: this.url + '/category/list?flag=select',
          props: {
            label: 'categoryKey',
            value: 'categoryValue',
          },
          rules: [{
            required: true,
            message: "请选择分组",
            trigger: "blur"
          }]
        }, {
          label: '大屏名称',
          span: 24,
          labelWidth: 100,
          prop: 'title',
          rules: [{
            required: true,
            message: "请输入大屏名称",
            trigger: "blur"
          }]
        }, {
          label: '大屏尺寸',
          span: 14,
          labelWidth: 100,
          prop: 'width',
          placeholder: '请输入宽度',
          rules: [{
            required: true,
            message: "请输入大屏尺寸",
            trigger: "blur"
          }]
        }, {
          label: '',
          span: 10,
          labelWidth: 1,
          prop: 'height',
          placeholder: '请输入高度',
          rules: [{
            required: true,
            message: "请输入大屏尺寸",
            trigger: "blur"
          }]
        }, {
          label: '密码',
          span: 24,
          type: 'password',
          labelWidth: 100,
          prop: 'password',
        }, {
          label: '发布状态',
          prop: 'status',
          span: 24,
          labelWidth: 100,
          type: 'select',
          dicData: [{
            label: '未发布',
            value: 0
          }, {
            label: '已发布',
            value: 1
          }]
        }]
      },
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
      form: {},
      box: false,
      activeName: '',
      otherName: '',
      list: [],
      username: '',
    }
  },
  created () {
    let token =  window.location.hash.replace("#/?token=","").replace('#/','');
    if(!token){
      token =  window.localStorage.getItem('token')
    }
    if(token){
      axios.defaults.headers["X-Access-Token"]=token
      window.localStorage.setItem('token',token);
    }
    this.username=jwt.decode(token).username;
    if(this.username){
      window.localStorage.setItem('username',this.username);
    }
    this.getCategory()
  },
  computed : {
    hasAuth(){
      return (this.username==='admin'&&this.activeName==='1')||this.activeName!=='1'
    }
  },
  methods: {
    vaildData (id) {
      const list = [];
      for (var i = 0; i < 20; i++) {
        list.push(i)
      }
      return list.includes(id)
    },
    getCategory () {
      getCategory().then(res => {
        const data = res.data.data || res.data.result;
        if(!data){
           return;
        }
        //数据处理‘我的大屏’在前面
        this.typelist = [...data];
        for (var i = 0; i < data.length; i++) {
              if (data[i].categoryValue === '3') {
                  this.typelist.splice(i, 1);
                  this.typelist.unshift(data[i]);
                  break;
              }
        }
        this.activeName = (this.typelist[0] || {}).categoryValue;
        this.otherName = (data[2] || {}).categoryValue;
        this.getList();
      })
    },
    handleCopy (item) {
      this.$confirm('确认复制当前大屏', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        copyObj(item.id).then(() => {
          this.$message.success('复制成功');
          this.getList();
        })
      }).catch(() => {

      });
    },
    handleDel (item, index) {
      // 加入密码保护功能
      const deleteFn=()=>{
        this.$confirm('是否确认永久删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // if (this.vaildData(index)) {
        //   this.$message.error('例子模板不允许修改')
        //   return false;
        // }
        delObj(item.id).then((res) => {
          if(res.data.success){
            this.list.splice(index, 1)
            this.$message.success('删除成功')
          }else{
            this.$message.error(res.data.message|| "删除失败")
          }
        })
      }).catch(() => {

      });
      }
      if(!item.password){
              deleteFn();
              return;
      }
      this.validateProtectionCode(item.password,deleteFn)
    },
    validateProtectionCode(protectionCode,cb){
       //有保护码大屏删除提示
        this.$prompt('您试图修改的大屏位于被保护中。若要进行修改，请您输入保护密码', '提示', {
        showClose:false,
        distinguishCancelAndClose:true,
        inputType:"password",
        showCancelButton:true,
        confirmButtonText: '确定',
        cancelButtonText: '关闭',
        inputPattern: /\S/,   	 //判断不为空正则
        inputErrorMessage: '保护密码不能为空'
    }).then(({value})=>{
       if(value!==protectionCode){
           this.$message.error('保护密码不正确');
           this.validateProtectionCode(protectionCode,cb);
           return;
       }
       if(cb && typeof cb==="function"){
           cb();
       }
    }).catch(action=>{
         action==="cancel"?null:this.validateProtectionCode(protectionCode,cb);
      })
    },
    handleUpdate (item, index) {
      const editFn = ()=>{
         this.form = item
        this.form.category = this.form.category + '';
        this.type = 'edit';
        this.option.column[2].display = false;
        this.option.column[3].display = false;
        this.box = true;
        this.index = index;
      }
      if(!item.password){
          editFn();
          return;
      }
      this.validateProtectionCode(item.password,editFn)

    },
    handleEdit (item) {
        let type=window.localStorage.getItem('type');
        if(!type){
          window.localStorage.setItem('type','0')
        }
        let path = '/build/' + item.id;
        let routeUrl = this.$router.resolve({path: path})
        let url= routeUrl.href+`?title=${item.title}`;
        window.open(url, '_blank');
    },
    handleViews (item) {
      let routeUrl = this.$router.resolve({
        path: '/view/' + item.id
      })
      let url= routeUrl.href+`?title=${item.title}`;
      window.open(url, '_blank');
    },
    handleAdd () {
      this.type = 'add';
      this.option.column[5].display = false;
      this.form.category = this.otherName;
      this.form.width = 1920;
      this.form.height = 1080;
      this.box = true;
    },
    handleSave (form, done) {
      done();
      if (this.type == 'add') {
        addObj(Object.assign({
          category: this.otherName,
        }, this.form)).then(res => {
          this.box = false;
          if(!res.data.success){
                this.$message.error(res.data.message || '新增失败');
                return
          }
          //清空表单数据
          this.form.category="1";
          this.form.password=""
          this.form.title=""
          this.$message.success('新增成功');
          this.getList();
          const data = res.data.data || res.data.result
          const id = data.id;
          const title = data.screenName;
          //新增时设置标识
          window.localStorage.setItem('type','1');
          this.handleEdit({ id,title })
        })
      } else {
        // if (this.vaildData(Number(this.index))) {
        //   this.$message.error('例子模板不允许修改')
        //   return false;
        // }
        updateObj(Object.assign({
          category: this.activeName
        }, {
          id: this.form.id,
          password: this.form.password,
          status: this.form.status,
          title: this.form.title,
          category: this.form.category
        })).then((res) => {
            this.box = false;
            if(!res.data.success){
                this.$message.error(res.data.message || '修改失败');
                return
            }
            this.$message.success('修改成功');
            this.getList();
        }).catch(()=>{
            this.box = false;
            this.$message.error('服务器异常');
        })
      }
    },
    handleSelect (key) {
      this.activeName = key;
      this.page.page = 1;
      this.getList();
    },
    handleCurrentChange (val) {
      this.page.page = val;
      this.getList();
    },
    handleSizeChange (val) {
      this.page.size = val;
      this.getList();
    },
    getList (category) {
      const loading = this.$loading({
        lock: true,
        text: '正在加载中，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.list = []
      getList({
        category: category || this.activeName,
        current: this.page.page,
        size: this.page.size,
      }).then(res => {
        loading.close();
        const data = res.data.data || res.data.result;
        this.page.total = data.total;
        this.list = data.records
        this.initData();
      })
    },
    initData () {
      this.list.forEach((ele, index) => {
        if(!ele.backgroundUrl){
            ele.backgroundUrl = ele.thumbnail || ele.imageUrl
        }
        this.$set(this.list[index], '_menu', false)
      })
    }
  }
}
</script>
<style lang="scss">
@import "@/styles/list.scss";
</style>
