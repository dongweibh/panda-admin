<template>
  <div>
    <div class="search-container">
      <el-button v-if="dingManage_dingAppTable_select" class="search-btn" type="primary" icon="el-icon-search"
                 @click="handleSearch">查询
      </el-button>
      <el-button v-if="dingManage_dingAppTable_add" class="search-btn" type="primary" icon="el-icon-plus"
                 @click="handleAdd">添加
      </el-button>
      <el-button v-if="dingManage_dingAppTable_select" class="search-btn" :autofocus="true" icon="el-icon-refresh"
                 @click="refreshHandle">刷新
      </el-button>
    </div>

    <el-table v-if="dingManage_dingAppTable_select" v-loading="listLoading" :data="list"
              :default-sort="{prop : 'agent_id' }" border highlight-current-row fit>
      <el-table-column align="center" type="index" width="50"></el-table-column>

      <el-table-column align="center" label="agentId" width="65" prop="agentId"></el-table-column>
      <el-table-column align="center" label="应用编号" width="200px" prop="appKey"></el-table-column>
      <el-table-column align="center" label="应用安全码" width="200px" prop="appSecret"></el-table-column>
      <el-table-column align="center" label="应用类型" width="200px" prop="appType"></el-table-column>
      <el-table-column align="center" label="用户名称" width="200px" prop="appName"></el-table-column>
      <el-table-column align="center" label="应用说明" width="200px" prop="appDescription"></el-table-column>
      <el-table-column align="center" label="企业编号" width="200px" prop="corpId"></el-table-column>
      <el-table-column align="center" label="根部门编号" width="200px" prop="rootDepartment"></el-table-column>
      <el-table-column align="center" label="建立日期" width="200px" prop="createDate"></el-table-column>
      <el-table-column align="center" label="操作" width="180"
                       v-if="dingManage_dingAppTable_update  || dingManage_dingAppTable_delete ">
        <template slot-scope="scope">
          <el-button v-if="dingManage_dingAppTable_update" size="mini" type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button v-if="dingManage_dingAppTable_delete" size="mini" type="danger" @click="handleDelete(scope.row)">
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
        <el-form-item label="应用编号" prop="appKey">
          <el-input v-model="form.appKey"
                    placeholder="请输入应用编号"></el-input>
        </el-form-item>
        <el-form-item label="应用安全码" prop="appSecret">
          <el-input v-model="form.appSecret"
                    placeholder="请输入应用安全码"></el-input>
        </el-form-item>
        <el-form-item label="应用类型" prop="appType">
          <el-input v-model="form.appType"
                    placeholder="请输入应用类型"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="appName">
          <el-input v-model="form.appName"
                    placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="应用说明" prop="appDescription">
          <el-input v-model="form.appDescription"
                    placeholder="请输入应用说明"></el-input>
        </el-form-item>
        <el-form-item label="企业编号" prop="corpId">
          <el-input v-model="form.corpId"
                    placeholder="请输入企业编号"></el-input>
        </el-form-item>
        <el-form-item label="根部门编号" prop="rootDepartment">
          <el-input v-model="form.rootDepartment"
                    placeholder="请输入根部门编号"></el-input>
        </el-form-item>
        <el-form-item label="建立日期" prop="createDate">
          <el-input v-model="form.createDate"
                    placeholder="请输入建立日期"></el-input>
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

  import { fetchList, delObj, getObj, addObj, putObj } from '@/api/dingManage/dingAppTable/index'
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
        dingManage_dingAppTable_select: false,
        dingManage_dingAppTable_update: false,
        dingManage_dingAppTable_delete: false,
        dingManage_dingAppTable_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted() {
      this.getList()
      this.dingManage_dingAppTable_select = this.permissions['/dingManage/dingAppTable:select']
      this.dingManage_dingAppTable_update = this.permissions['/dingManage/dingAppTable:update']
      this.dingManage_dingAppTable_delete = this.permissions['/dingManage/dingAppTable:delete']
      this.dingManage_dingAppTable_add = this.permissions['/dingManage/dingAppTable:add']
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
        getObj(row.agentId)
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
