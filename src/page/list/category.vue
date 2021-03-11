<template>
  <div class="map">
    <avue-crud :option="option"
               v-model="form"
               @row-save="rowSave"
               @row-update="rowUpdate"
               @row-del="rowDel"
               :before-open="beforeOpen"
               :data="data"></avue-crud>
  </div>
</template>

<script>
import { getList, getObj, addObj, delObj, updateObj } from '@/api/category'
export default {
  data () {
    return {
      form: {},
      data: [],
      option: {
        index: true,
        align: 'center',
        headerAlign: 'center',
        column: [
          {
            label: '模块名',
            prop: 'categoryKey',
            rules: [{
              required: true,
              message: "请输入模块名",
              trigger: "blur"
            }]
          },
          {
            label: '模块值',
            prop: 'categoryValue',
            rules: [{
              required: true,
              message: "请输入模块值",
              trigger: "blur"
            }]
          }
        ]
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    vaildData (id) {
      return [0, 1].includes(id)
    },
    beforeOpen (done, type) {
      let username =  window.localStorage.getItem('username')
      if (username && username!=='admin') {
        this.$message.error('没有操作权限')
        return false;
      }
      if (type == 'edit') {
        getObj(this.form.id).then(res => {
          const data = res.data.data || res.data.result;
          this.form = data
          done()
        })
      } else {
        done()
      }
    },
    rowDel (row, index) {
      if (this.vaildData(index)) {
        this.$message.error('例子模板不允许删除')
        return false;
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(res => {
          if(res.data.success){
            this.$message.success('删除成功');
          }else{
            this.$message.error(res.data.message || '删除失败');
            return;
          }
          this.getList()
        })
      }).catch(() => {

      });

    },
    rowUpdate (row, index, done) {
      // if (this.vaildData(index)) {
      //   this.$message.error('例子模板不允许修改')
      //   return false;
      // }
      updateObj(row).then(res => {
        if(res.data.success){
          this.$message.success('修改成功');
        }else{
          this.$message.error(res.data.message || '修改失败');
          done();
          return;
        }
        this.getList()
        done();
      })
    },
    rowSave (row, done) {
      addObj(row).then(res  => {
        if(res.data.success){
          this.$message.success('新增成功');
        }else{
          this.$message.error(res.data.message || '新增失败');
          done();
          return;
        }
        this.getList()
        done();
      })
    },
    getList () {
      getList({
        current: 1,
        size: 100,
      }).then(res => {
        const data = res.data.data || res.data.result;
        this.data = data;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  padding: 30px;
  width: 100%;
  .title {
    display: block;
    margin-bottom: 30px;
    padding: 0 50px;
    font-size: 20px;
  }
}
</style>
