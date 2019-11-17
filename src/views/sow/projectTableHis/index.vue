<template>
  <div>
    <div class="search-container">
      <el-button v-if="sow_projectTableHis_select" class="search-btn" type="primary" icon="el-icon-search"
                 @click="handleSearch">查询
      </el-button>
      <el-button v-if="sow_projectTableHis_add" class="search-btn" type="primary" icon="el-icon-plus"
                 @click="handleAdd">添加
      </el-button>
      <el-button v-if="sow_projectTableHis_select" class="search-btn" :autofocus="true" icon="el-icon-refresh"
                 @click="refreshHandle">刷新
      </el-button>
    </div>

    <el-table v-if="sow_projectTableHis_select" v-loading="listLoading" :data="list" :default-sort="{prop : 'no' }"
              border highlight-current-row fit>
      <el-table-column align="center" type="index" width="50"></el-table-column>

      <el-table-column align="center" label="no" width="65" prop="no"></el-table-column>
      <el-table-column align="center" label="项目编号" width="200px" prop="projectNo"></el-table-column>
      <el-table-column align="center" label="项目年度" width="200px" prop="projectYear"></el-table-column>
      <el-table-column align="center" label="项目类型" width="200px" prop="projectType"></el-table-column>
      <el-table-column align="center" label="项目编号" width="200px" prop="registNo"></el-table-column>
      <el-table-column align="center" label="项目名称" width="200px" prop="projectName"></el-table-column>
      <el-table-column align="center" label="项目概要说明" width="200px" prop="summary"></el-table-column>
      <el-table-column align="center" label="发起部门" width="200px" prop="initiateDepartment"></el-table-column>
      <el-table-column align="center" label="项目经理" width="200px" prop="projectManager"></el-table-column>
      <el-table-column align="center" label="计划开始日期" width="200px" prop="plannedStartDate"></el-table-column>
      <el-table-column align="center" label="计划完成日期" width="200px" prop="plannedCompletionDate"></el-table-column>
      <el-table-column align="center" label="项目时长(月)" width="200px" prop="projectDuration"></el-table-column>
      <el-table-column align="center" label="项目预算" width="200px" prop="projectBudget"></el-table-column>
      <el-table-column align="center" label="限制时间长度" width="200px" prop="limitedTimeLength"></el-table-column>
      <el-table-column align="center" label="配合系统数量" width="200px" prop="numberOfSupportingSystems"></el-table-column>
      <el-table-column align="center" label="难度等级" width="200px" prop="difficultyLevel"></el-table-column>
      <el-table-column align="center" label="重要等级" width="200px" prop="importanceLevel"></el-table-column>
      <el-table-column align="center" label="其他说明" width="200px" prop="otherInstructionslevel"></el-table-column>
      <el-table-column align="center" label="备注信息" width="200px" prop="remarksInformation"></el-table-column>
      <el-table-column align="center" label="承办团队名称" width="200px" prop="hostTeam"></el-table-column>
      <el-table-column align="center" label="重大项目标志" width="200px" prop="isMajorProject"></el-table-column>
      <el-table-column align="center" label="项目阶段" width="200px" prop="stage"></el-table-column>
      <el-table-column align="center" label="项目进度比率" width="200px" prop="progressRatio"></el-table-column>
      <el-table-column align="center" label="审批进度" width="200px" prop="approvalStage"></el-table-column>
      <el-table-column align="center" label="记录时间" width="200px" prop="recordTime"></el-table-column>
      <el-table-column align="center" label="登记人" width="200px" prop="recordOperator"></el-table-column>
      <el-table-column align="center" label="操作" width="180"
                       v-if="sow_projectTableHis_update  || sow_projectTableHis_delete ">
        <template slot-scope="scope">
          <el-button v-if="sow_projectTableHis_update" size="mini" type="primary" @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button v-if="sow_projectTableHis_delete" size="mini" type="danger" @click="handleDelete(scope.row)">删除
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
        <el-form-item label="项目编号" prop="projectNo">
          <el-input v-model="form.projectNo"
                    placeholder="请输入项目编号"></el-input>
        </el-form-item>
        <el-form-item label="项目年度" prop="projectYear">
          <el-input v-model="form.projectYear"
                    placeholder="请输入项目年度"></el-input>
        </el-form-item>
        <el-form-item label="项目类型" prop="projectType">
          <el-input v-model="form.projectType"
                    placeholder="请输入项目类型"></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="registNo">
          <el-input v-model="form.registNo"
                    placeholder="请输入项目编号"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName"
                    placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="项目概要说明" prop="summary">
          <el-input v-model="form.summary"
                    placeholder="请输入项目概要说明"></el-input>
        </el-form-item>
        <el-form-item label="发起部门" prop="initiateDepartment">
          <el-input v-model="form.initiateDepartment"
                    placeholder="请输入发起部门"></el-input>
        </el-form-item>
        <el-form-item label="项目经理" prop="projectManager">
          <el-input v-model="form.projectManager"
                    placeholder="请输入项目经理"></el-input>
        </el-form-item>
        <el-form-item label="计划开始日期" prop="plannedStartDate">
          <el-input v-model="form.plannedStartDate"
                    placeholder="请输入计划开始日期"></el-input>
        </el-form-item>
        <el-form-item label="计划完成日期" prop="plannedCompletionDate">
          <el-input v-model="form.plannedCompletionDate"
                    placeholder="请输入计划完成日期"></el-input>
        </el-form-item>
        <el-form-item label="项目时长(月)" prop="projectDuration">
          <el-input v-model="form.projectDuration"
                    placeholder="请输入项目时长(月)"></el-input>
        </el-form-item>
        <el-form-item label="项目预算" prop="projectBudget">
          <el-input v-model="form.projectBudget"
                    placeholder="请输入项目预算"></el-input>
        </el-form-item>
        <el-form-item label="限制时间长度" prop="limitedTimeLength">
          <el-input v-model="form.limitedTimeLength"
                    placeholder="请输入限制时间长度"></el-input>
        </el-form-item>
        <el-form-item label="配合系统数量" prop="numberOfSupportingSystems">
          <el-input v-model="form.numberOfSupportingSystems"
                    placeholder="请输入配合系统数量"></el-input>
        </el-form-item>
        <el-form-item label="难度等级" prop="difficultyLevel">
          <el-input v-model="form.difficultyLevel"
                    placeholder="请输入难度等级"></el-input>
        </el-form-item>
        <el-form-item label="重要等级" prop="importanceLevel">
          <el-input v-model="form.importanceLevel"
                    placeholder="请输入重要等级"></el-input>
        </el-form-item>
        <el-form-item label="其他说明" prop="otherInstructionslevel">
          <el-input v-model="form.otherInstructionslevel"
                    placeholder="请输入其他说明"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" prop="remarksInformation">
          <el-input v-model="form.remarksInformation"
                    placeholder="请输入备注信息"></el-input>
        </el-form-item>
        <el-form-item label="承办团队名称" prop="hostTeam">
          <el-input v-model="form.hostTeam"
                    placeholder="请输入承办团队名称"></el-input>
        </el-form-item>
        <el-form-item label="重大项目标志" prop="isMajorProject">
          <el-input v-model="form.isMajorProject"
                    placeholder="请输入重大项目标志"></el-input>
        </el-form-item>
        <el-form-item label="项目阶段" prop="stage">
          <el-input v-model="form.stage"
                    placeholder="请输入项目阶段"></el-input>
        </el-form-item>
        <el-form-item label="项目进度比率" prop="progressRatio">
          <el-input v-model="form.progressRatio"
                    placeholder="请输入项目进度比率"></el-input>
        </el-form-item>
        <el-form-item label="审批进度" prop="approvalStage">
          <el-input v-model="form.approvalStage"
                    placeholder="请输入审批进度"></el-input>
        </el-form-item>
        <el-form-item label="记录时间" prop="recordTime">
          <el-input v-model="form.recordTime"
                    placeholder="请输入记录时间"></el-input>
        </el-form-item>
        <el-form-item label="登记人" prop="recordOperator">
          <el-input v-model="form.recordOperator"
                    placeholder="请输入登记人"></el-input>
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

  import { fetchList, delObj, getObj, addObj, putObj } from '@/api/sow/projectTableHis/index'
  import { mapGetters } from 'vuex'

  export default {
    name: 'sow',
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
        sow_projectTableHis_select: false,
        sow_projectTableHis_update: false,
        sow_projectTableHis_delete: false,
        sow_projectTableHis_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted() {
      this.getList()
      this.sow_projectTableHis_select = this.permissions['/sow/projectTableHis:select']
      this.sow_projectTableHis_update = this.permissions['/sow/projectTableHis:update']
      this.sow_projectTableHis_delete = this.permissions['/sow/projectTableHis:delete']
      this.sow_projectTableHis_add = this.permissions['/sow/projectTableHis:add']
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
        getObj(row.no)
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
