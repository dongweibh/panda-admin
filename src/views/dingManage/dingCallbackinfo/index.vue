<template>
  <div>
    <div class="search-container">
      <el-button v-if="dingManage_dingCallbackinfo_select" class="search-btn" type="primary" icon="el-icon-search"
                 @click="handleSearch">查询
      </el-button>
      <el-button v-if="dingManage_dingCallbackinfo_add" class="search-btn" type="primary" icon="el-icon-plus"
                 @click="handleAdd">添加
      </el-button>
      <el-button v-if="dingManage_dingCallbackinfo_select" class="search-btn" :autofocus="true" icon="el-icon-refresh"
                 @click="refreshHandle">刷新
      </el-button>
    </div>

    <el-table v-if="dingManage_dingCallbackinfo_select" v-loading="listLoading" :data="list"
              :default-sort="{prop : 'callback_id' }" border highlight-current-row fit>
      <el-table-column align="center" type="index" width="50"></el-table-column>

      <el-table-column align="center" label="callbackId" width="65" prop="callbackId"></el-table-column>
      <el-table-column align="center" label="事件类型" width="200px" prop="eventType"></el-table-column>
      <el-table-column align="center" label="时间戳" width="200px" prop="timeStamp"></el-table-column>
      <el-table-column align="center" label="企业编号" width="200px" prop="corpId"></el-table-column>
      <el-table-column align="center" label="回调数据" width="200px" prop="callbackData"></el-table-column>
      <el-table-column align="center" label="操作" width="180"
                       v-if="dingManage_dingCallbackinfo_update  || dingManage_dingCallbackinfo_delete ">
        <template slot-scope="scope">
          <el-button v-if="dingManage_dingCallbackinfo_update" size="mini" type="primary"
                     @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button v-if="dingManage_dingCallbackinfo_delete" size="mini" type="danger"
                     @click="handleDelete(scope.row)">删除
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
        <el-form-item label="事件类型" prop="eventType">
          <el-input v-model="form.eventType"
                    placeholder="请输入事件类型"></el-input>
        </el-form-item>
        <el-form-item label="时间戳" prop="timeStamp">
          <el-input v-model="form.timeStamp"
                    placeholder="请输入时间戳"></el-input>
        </el-form-item>
        <el-form-item label="企业编号" prop="corpId">
          <el-input v-model="form.corpId"
                    placeholder="请输入企业编号"></el-input>
        </el-form-item>
        <el-form-item label="回调数据" prop="callbackData">
          <el-input v-model="form.callbackData"
                    placeholder="请输入回调数据"></el-input>
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

  import { fetchList, delObj, getObj, addObj, putObj } from '@/api/dingManage/dingCallbackinfo/index'
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
        dingManage_dingCallbackinfo_select: false,
        dingManage_dingCallbackinfo_update: false,
        dingManage_dingCallbackinfo_delete: false,
        dingManage_dingCallbackinfo_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted() {
      this.getList()
      this.dingManage_dingCallbackinfo_select = this.permissions['/dingManage/dingCallbackinfo:select']
      this.dingManage_dingCallbackinfo_update = this.permissions['/dingManage/dingCallbackinfo:update']
      this.dingManage_dingCallbackinfo_delete = this.permissions['/dingManage/dingCallbackinfo:delete']
      this.dingManage_dingCallbackinfo_add = this.permissions['/dingManage/dingCallbackinfo:add']
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
        getObj(row.callbackId)
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
