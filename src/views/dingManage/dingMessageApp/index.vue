<template>
  <div>
    <div class="search-container">
      <el-button v-if="dingManage_dingMessageApp_select" class="search-btn" type="primary" icon="el-icon-search"
                 @click="handleSearch">查询
      </el-button>
      <el-button v-if="dingManage_dingMessageApp_add" class="search-btn" type="primary" icon="el-icon-plus"
                 @click="handleAdd">添加
      </el-button>
      <el-button v-if="dingManage_dingMessageApp_select" class="search-btn" :autofocus="true" icon="el-icon-refresh"
                 @click="refreshHandle">刷新
      </el-button>
    </div>

    <el-table v-if="dingManage_dingMessageApp_select" v-loading="listLoading" :data="list"
              :default-sort="{prop : 'message_app_id' }" border highlight-current-row fit>
      <el-table-column align="center" type="index" width="50"></el-table-column>

      <el-table-column align="center" label="messageAppId" width="65" prop="messageAppId"></el-table-column>
      <el-table-column align="center" label="钉钉应用编号" width="200px" prop="agentId"></el-table-column>
      <el-table-column align="center" label="应用首页" width="200px" prop="appUrl"></el-table-column>
      <el-table-column align="center" label="应用处理类" width="200px" prop="appClass"></el-table-column>
      <el-table-column align="center" label="应用处理方法" width="200px" prop="appClassMethod"></el-table-column>
      <el-table-column align="center" label="回调地址" width="200px" prop="callbackUrl"></el-table-column>
      <el-table-column align="center" label="回调类型" width="200px" prop="callbackType"></el-table-column>
      <el-table-column align="center" label="图片地址" width="200px" prop="defaultPicUrl"></el-table-column>
      <el-table-column align="center" label="回调token申请地址" width="200px" prop="callbackTokenUrl"></el-table-column>
      <el-table-column align="center" label="公钥" width="200px" prop="publicKeyPath"></el-table-column>
      <el-table-column align="center" label="私钥" width="200px" prop="privateKeyPath"></el-table-column>
      <el-table-column align="center" label="操作" width="180"
                       v-if="dingManage_dingMessageApp_update  || dingManage_dingMessageApp_delete ">
        <template slot-scope="scope">
          <el-button v-if="dingManage_dingMessageApp_update" size="mini" type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button v-if="dingManage_dingMessageApp_delete" size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="footer">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.current" :page-size="listQuery.size" :page-sizes="[10, 40, 80, 100]"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="钉钉应用编号" prop="agentId">
          <el-input v-model="form.agentId"
                    placeholder="请输入钉钉应用编号"></el-input>
        </el-form-item>
        <el-form-item label="应用首页" prop="appUrl">
          <el-input v-model="form.appUrl"
                    placeholder="请输入应用首页"></el-input>
        </el-form-item>
        <el-form-item label="应用处理类" prop="appClass">
          <el-input v-model="form.appClass"
                    placeholder="请输入应用处理类"></el-input>
        </el-form-item>
        <el-form-item label="应用处理方法" prop="appClassMethod">
          <el-input v-model="form.appClassMethod"
                    placeholder="请输入应用处理方法"></el-input>
        </el-form-item>
        <el-form-item label="回调地址" prop="callbackUrl">
          <el-input v-model="form.callbackUrl"
                    placeholder="请输入回调地址"></el-input>
        </el-form-item>
        <el-form-item label="回调类型" prop="callbackType">
          <el-input v-model="form.callbackType"
                    placeholder="请输入回调类型"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="defaultPicUrl">
          <el-input v-model="form.defaultPicUrl"
                    placeholder="请输入图片地址"></el-input>
        </el-form-item>
        <el-form-item label="回调token申请地址" prop="callbackTokenUrl">
          <el-input v-model="form.callbackTokenUrl"
                    placeholder="请输入回调token申请地址"></el-input>
        </el-form-item>
        <el-form-item label="公钥" prop="publicKeyPath">
          <el-input v-model="form.publicKeyPath"
                    placeholder="请输入公钥"></el-input>
        </el-form-item>
        <el-form-item label="私钥" prop="privateKeyPath">
          <el-input v-model="form.privateKeyPath"
                    placeholder="请输入私钥"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import { fetchList, delObj, getObj, addObj, putObj } from '@/api/dingManage/dingMessageApp/index'
  import { mapGetters } from 'vuex'

  export default {
    name: 'dingManage',
    data() {
      return {
        form: {},
        rules: {},
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          current: 1,
          size: 10,
          username: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        dingManage_dingMessageApp_select: false,
        dingManage_dingMessageApp_update: false,
        dingManage_dingMessageApp_delete: false,
        dingManage_dingMessageApp_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted() {
      this.getList()
      this.dingManage_dingMessageApp_select = this.permissions['/dingManage/dingMessageApp:select']
      this.dingManage_dingMessageApp_update = this.permissions['/dingManage/dingMessageApp:update']
      this.dingManage_dingMessageApp_delete = this.permissions['/dingManage/dingMessageApp:delete']
      this.dingManage_dingMessageApp_add = this.permissions['/dingManage/dingMessageApp:add']
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchList(this.listQuery)
          .then(response => {
            this.list = response.data.records
            this.total = response.data.total
            this.listLoading = false
          })
      },
      handleFilter() {
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleAdd() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        getObj(row.messageAppId)
          .then(response => {
            this.form = response.data
            this.dialogFormVisible = true
            this.dialogStatus = 'update'
          })
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            delObj(row.id)
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
                const index = this.list.indexOf(row)
                this.list.splice(index, 1)
              })
          })
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form.id, this.form).then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      },
      resetTemp() {
        this.form = {
          username: undefined,
          name: undefined,
          sex: '男',
          password: undefined,
          description: undefined
        }
      }
    }
  }
</script>
