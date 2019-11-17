<template>
  <div>
    <div class="search-container">
      <el-button v-if="dingManage_dingMessageLog_select" class="search-btn" type="primary" icon="el-icon-search"
                 @click="handleSearch">查询
      </el-button>
      <el-button v-if="dingManage_dingMessageLog_add" class="search-btn" type="primary" icon="el-icon-plus" @click="handleAdd">
        添加
      </el-button>
      <el-button v-if="dingManage_dingMessageLog_select" class="search-btn" :autofocus="true" icon="el-icon-refresh"
                 @click="refreshHandle">刷新
      </el-button>
    </div>

    <el-table v-if="dingManage_dingMessageLog_select" v-loading="listLoading" :data="list"
              :default-sort="{prop : 'message_serial' }" border highlight-current-row fit>
      <el-table-column align="center" type="index" width="50"></el-table-column>

      <el-table-column align="center" label="messageSerial" width="65" prop="messageSerial"></el-table-column>
      <el-table-column align="center" label="请求时间" width="200px" prop="requestDate"></el-table-column>
      <el-table-column align="center" label="消息编号" width="200px" prop="messageApiId"></el-table-column>
      <el-table-column align="center" label="员工编号" width="200px" prop="jobnumbers"></el-table-column>
      <el-table-column align="center" label="钉钉用户编号" width="200px" prop="dingUserId"></el-table-column>
      <el-table-column align="center" label="请求的消息体" width="200px" prop="requestMessageBody"></el-table-column>
      <el-table-column align="center" label="钉钉消息类型" width="200px" prop="dingMessageClass"></el-table-column>
      <el-table-column align="center" label="钉钉消息体类型" width="200px" prop="dingMessageType"></el-table-column>
      <el-table-column align="center" label="钉钉消息体" width="200px" prop="dingMessageBody"></el-table-column>
      <el-table-column align="center" label="操作" width="180" v-if="_dingMessageLog_update  || _dingMessageLog_delete ">
        <template slot-scope="scope">
          <el-button v-if="_dingMessageLog_update" size="mini" type="primary" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button v-if="_dingMessageLog_delete" size="mini" type="danger" @click="handleDelete(scope.row)">删除
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
        <el-form-item label="请求时间" prop="requestDate">
          <el-input v-model="form.requestDate"
                    placeholder="请输入请求时间"></el-input>
        </el-form-item>
        <el-form-item label="消息编号" prop="messageApiId">
          <el-input v-model="form.messageApiId"
                    placeholder="请输入消息编号"></el-input>
        </el-form-item>
        <el-form-item label="员工编号" prop="jobnumbers">
          <el-input v-model="form.jobnumbers"
                    placeholder="请输入员工编号"></el-input>
        </el-form-item>
        <el-form-item label="钉钉用户编号" prop="dingUserId">
          <el-input v-model="form.dingUserId"
                    placeholder="请输入钉钉用户编号"></el-input>
        </el-form-item>
        <el-form-item label="请求的消息体" prop="requestMessageBody">
          <el-input v-model="form.requestMessageBody"
                    placeholder="请输入请求的消息体"></el-input>
        </el-form-item>
        <el-form-item label="钉钉消息类型" prop="dingMessageClass">
          <el-input v-model="form.dingMessageClass"
                    placeholder="请输入钉钉消息类型"></el-input>
        </el-form-item>
        <el-form-item label="钉钉消息体类型" prop="dingMessageType">
          <el-input v-model="form.dingMessageType"
                    placeholder="请输入钉钉消息体类型"></el-input>
        </el-form-item>
        <el-form-item label="钉钉消息体" prop="dingMessageBody">
          <el-input v-model="form.dingMessageBody"
                    placeholder="请输入钉钉消息体"></el-input>
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

  import { fetchList, delObj, getObj, addObj, putObj } from '@/api/dingManage/dingMessageLog/index'
  import { mapGetters } from 'vuex'

  export default {
    name: '',
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
        dingManage_dingMessageLog_select: false,
        dingManage_dingMessageLog_update: false,
        dingManage_dingMessageLog_delete: false,
        dingManage_dingMessageLog_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted() {
      this.getList()
      this.dingManage_dingMessageLog_select = this.permissions['/dingManage/dingMessageLog:select']
      this.dingManage_dingMessageLog_update = this.permissions['/dingManage/dingMessageLog:update']
      this.dingManage_dingMessageLog_delete = this.permissions['/dingManage/dingMessageLog:delete']
      this.dingManage_dingMessageLog_add = this.permissions['/dingManage/dingMessageLog:add']
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
        getObj(row.messageSerial)
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
