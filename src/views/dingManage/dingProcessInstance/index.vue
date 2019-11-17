<template>
  <div>
    <div class="search-container">
      <el-button v-if="dingManage_dingProcessInstance_select" class="search-btn" type="primary" icon="el-icon-search"
                 @click="handleSearch">查询
      </el-button>
      <el-button v-if="dingManage_dingProcessInstance_add" class="search-btn" type="primary" icon="el-icon-plus"
                 @click="handleAdd">添加
      </el-button>
      <el-button v-if="dingManage_dingProcessInstance_select" class="search-btn" :autofocus="true" icon="el-icon-refresh"
                 @click="refreshHandle">刷新
      </el-button>
    </div>

    <el-table v-if="dingManage_dingProcessInstance_select" v-loading="listLoading" :data="list"
              :default-sort="{prop : 'process_instance_id' }" border highlight-current-row fit>
      <el-table-column align="center" type="index" width="50"></el-table-column>

      <el-table-column align="center" label="processInstanceId" width="65" prop="processInstanceId"></el-table-column>
      <el-table-column align="center" label="审批实例标题" width="200px" prop="title"></el-table-column>
      <el-table-column align="center" label="开始时间" width="200px" prop="createTime"></el-table-column>
      <el-table-column align="center" label="结束时间" width="200px" prop="finishTime"></el-table-column>
      <el-table-column align="center" label="发起人" width="200px" prop="originatorUserid"></el-table-column>
      <el-table-column align="center" label="发起部门" width="200px" prop="originatorDeptId"></el-table-column>
      <el-table-column align="center" label="审批状态" width="200px" prop="status"></el-table-column>
      <el-table-column align="center" label="抄送人" width="200px" prop="ccUserids"></el-table-column>
      <el-table-column align="center" label="审批结果" width="200px" prop="result"></el-table-column>
      <el-table-column align="center" label="审批实例业务编号" width="200px" prop="businessId"></el-table-column>
      <el-table-column align="center" label="操作记录列表" width="200px" prop="operationRecords"></el-table-column>
      <el-table-column align="center" label="已审批任务列表" width="200px" prop="tasks"></el-table-column>
      <el-table-column align="center" label="发起部门" width="200px" prop="originatorDeptName"></el-table-column>
      <el-table-column align="center" label="业务动作" width="200px" prop="bizAction"></el-table-column>
      <el-table-column align="center" label="附属实例列表" width="200px" prop="attachedProcessInstanceIds"></el-table-column>
      <el-table-column align="center" label="流程代码" width="200px" prop="processId"></el-table-column>
      <el-table-column align="center" label="关联流程状态" width="200px" prop="nextStatus"></el-table-column>
      <el-table-column align="center" label="操作" width="180"
                       v-if="_dingProcessInstance_update  || _dingProcessInstance_delete ">
        <template slot-scope="scope">
          <el-button v-if="dingManage_dingProcessInstance_update" size="mini" type="primary" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button v-if="dingManage_dingProcessInstance_delete" size="mini" type="danger" @click="handleDelete(scope.row)">删除
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
        <el-form-item label="审批实例标题" prop="title">
          <el-input v-model="form.title"
                    placeholder="请输入审批实例标题"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="createTime">
          <el-input v-model="form.createTime"
                    placeholder="请输入开始时间"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="finishTime">
          <el-input v-model="form.finishTime"
                    placeholder="请输入结束时间"></el-input>
        </el-form-item>
        <el-form-item label="发起人" prop="originatorUserid">
          <el-input v-model="form.originatorUserid"
                    placeholder="请输入发起人"></el-input>
        </el-form-item>
        <el-form-item label="发起部门" prop="originatorDeptId">
          <el-input v-model="form.originatorDeptId"
                    placeholder="请输入发起部门"></el-input>
        </el-form-item>
        <el-form-item label="审批状态" prop="status">
          <el-input v-model="form.status"
                    placeholder="请输入审批状态"></el-input>
        </el-form-item>
        <el-form-item label="抄送人" prop="ccUserids">
          <el-input v-model="form.ccUserids"
                    placeholder="请输入抄送人"></el-input>
        </el-form-item>
        <el-form-item label="审批结果" prop="result">
          <el-input v-model="form.result"
                    placeholder="请输入审批结果"></el-input>
        </el-form-item>
        <el-form-item label="审批实例业务编号" prop="businessId">
          <el-input v-model="form.businessId"
                    placeholder="请输入审批实例业务编号"></el-input>
        </el-form-item>
        <el-form-item label="操作记录列表" prop="operationRecords">
          <el-input v-model="form.operationRecords"
                    placeholder="请输入操作记录列表"></el-input>
        </el-form-item>
        <el-form-item label="已审批任务列表" prop="tasks">
          <el-input v-model="form.tasks"
                    placeholder="请输入已审批任务列表"></el-input>
        </el-form-item>
        <el-form-item label="发起部门" prop="originatorDeptName">
          <el-input v-model="form.originatorDeptName"
                    placeholder="请输入发起部门"></el-input>
        </el-form-item>
        <el-form-item label="业务动作" prop="bizAction">
          <el-input v-model="form.bizAction"
                    placeholder="请输入业务动作"></el-input>
        </el-form-item>
        <el-form-item label="附属实例列表" prop="attachedProcessInstanceIds">
          <el-input v-model="form.attachedProcessInstanceIds"
                    placeholder="请输入附属实例列表"></el-input>
        </el-form-item>
        <el-form-item label="流程代码" prop="processId">
          <el-input v-model="form.processId"
                    placeholder="请输入流程代码"></el-input>
        </el-form-item>
        <el-form-item label="关联流程状态" prop="nextStatus">
          <el-input v-model="form.nextStatus"
                    placeholder="请输入关联流程状态"></el-input>
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

  import { fetchList, delObj, getObj, addObj, putObj } from '@/api/dingManage/dingProcessInstance/index'
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
        dingManage_dingProcessInstance_select: false,
        dingManage_dingProcessInstance_update: false,
        dingManage_dingProcessInstance_delete: false,
        dingManage_dingProcessInstance_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted() {
      this.getList()
      this.dingManage_dingProcessInstance_select = this.permissions['/dingManage/dingProcessInstance:select']
      this.dingManage_dingProcessInstance_update = this.permissions['/dingManage/dingProcessInstance:update']
      this.dingManage_dingProcessInstance_delete = this.permissions['/dingManage/dingProcessInstance:delete']
      this.dingManage_dingProcessInstance_add = this.permissions['/dingManage/dingProcessInstance:add']
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
        getObj(row.processInstanceId)
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
