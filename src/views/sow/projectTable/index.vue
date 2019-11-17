<template>
  <div>
    <div class="search-container">

      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="项目编号" v-model="listQuery.projectNo"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="项目经理" v-model="listQuery.projectManager"></el-input>
      <el-select class="filter-item w347" v-model="listQuery.projectType" placeholder="项目类型：请选择">
        <el-option v-for="item in projectTypesOptions" :key="item.value" :label="item.desc" :value="item.value"
                   :disabled="isDisabled[item.delFlag]">
          <span style="float: left">{{ item.desc }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        </el-option>
      </el-select>

      <el-select class="filter-item w347" v-model="listQuery.hostTeam" placeholder="承接团队：请选择">
        <el-option v-for="item in hostTeams" :key="item.hostTeam" :label="item.hostTeam" :value="item.hostTeam"
                   :disabled="isDisabled[item.delFlag]">
          <span style="float: left">{{ item.hostTeam }}</span>
        </el-option>
      </el-select>

      <el-button v-if="sow_projectTable_select" class="search-btn" type="primary" icon="el-icon-clean "
                 @click="handleSearchClean">重置条件
      </el-button>
      <el-button v-if="sow_projectTable_select" class="search-btn" type="primary" icon="el-icon-search"
                 @click="handleSearch">查询
      </el-button>
      <el-button v-if="sow_projectTable_add" class="search-btn" type="primary" icon="el-icon-plus" @click="handleAdd">
        添加
      </el-button>
      <el-button v-if="sow_projectTable_select" class="search-btn" :autofocus="true" icon="el-icon-refresh"
                 @click="refreshHandle">刷新
      </el-button>
    </div>

    <el-table v-if="sow_projectTable_select" v-loading="listLoading" :data="list" :default-sort="{prop : 'project_no' }"
              border highlight-current-row fit>
      <el-table-column align="center" type="index" width="50"></el-table-column>

      <el-table-column align="center" label="项目编号" width="100px" prop="projectNo"></el-table-column>
      <el-table-column align="center" label="项目年度" width="100px" prop="projectYear"></el-table-column>
      <el-table-column align="center" label="项目类型" width="300px" prop="projectType" :formatter="projectTypeName">
      </el-table-column>
      <el-table-column align="center" label="年度项目序号" width="200px" prop="registNo"></el-table-column>
      <el-table-column align="center" label="项目名称" width="200px" prop="projectName"></el-table-column>
      <!--      <el-table-column align="center" label="项目概要说明" width="200px" prop="summary"></el-table-column>-->
      <el-table-column align="center" label="发起部门" width="200px" prop="initiateDepartment"></el-table-column>
      <el-table-column align="center" label="项目经理" width="200px" prop="projectManager"></el-table-column>
      <el-table-column align="center" label="计划开始日期" width="200px" prop="plannedStartDate">
        <template slot-scope="scope">
          <span>{{scope.row.plannedStartDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>

      </el-table-column>

      <el-table-column align="center" label="计划完成日期" width="200px" prop="plannedCompletionDate">
        <template slot-scope="scope">
          <span>{{scope.row.plannedCompletionDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="项目时长(月)" width="200px" prop="projectDuration"></el-table-column>
      <el-table-column align="center" label="项目预算" width="200px" prop="projectBudget"></el-table-column>
      <el-table-column align="center" label="限制时间长度" width="200px" prop="limitedTimeLength"></el-table-column>
      <el-table-column align="center" label="配合系统数量" width="200px" prop="numberOfSupportingSystems"></el-table-column>
      <el-table-column align="center" label="难度等级" width="200px" prop="difficultyLevel"></el-table-column>
      <el-table-column align="center" label="重要等级" width="200px" prop="importanceLevel"></el-table-column>
      <el-table-column align="center" label="其他说明" width="200px" prop="otherInstructionslevel"></el-table-column>
      <!--      <el-table-column align="center" label="备注信息" width="200px" prop="remarksInformation"></el-table-column>-->
      <el-table-column align="center" label="承办团队名称" width="200px" prop="hostTeam"></el-table-column>
      <el-table-column align="center" label="重大项目标志" width="200px" prop="isMajorProject"></el-table-column>
      <el-table-column align="center" label="项目阶段" width="200px" prop="stage"></el-table-column>
      <el-table-column align="center" label="项目进度比率" width="200px" prop="progressRatio"></el-table-column>
      <el-table-column align="center" label="审批进度" width="200px" prop="approvalStage"></el-table-column>
      <el-table-column align="center" label="记录时间" width="200px" prop="recordTime">
        <template slot-scope="scope">
          <span>{{scope.row.plannedCompletionDate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="登记人" width="200px" prop="recordOperator"></el-table-column>

      <el-table-column align="center" fixed="right" label="操作" width="180">
        v-if="sow_projectTable_update || sow_projectTable_delete ">
        <template slot-scope="scope">
          <el-button v-if="sow_projectTable_update" size="mini" type="primary" @click="handleUpdate(scope.row)">编辑
          </el-button>
          <el-button v-if="sow_projectTable_delete" size="mini" type="danger" @click="handleDelete(scope.row)">删除
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
          <el-select class="filter-item w347" v-model="form.projectType" placeholder="请选择">
            <el-option v-for="item in projectTypesOptions" :key="item.value" :label="item.desc" :value="item.value"
                       :disabled="isDisabled[item.delFlag]">
              <span style="float: left">{{ item.desc }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>

          </el-select>
        </el-form-item>


        <el-form-item label="年度项目序号" prop="registNo">
          <el-input v-model="form.registNo"
                    placeholder="年度项目序号"></el-input>
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
        <el-form-item label="计划开始日期:" prop="plannedStartDate">
          <el-date-picker
            v-model="form.plannedStartDate"
            type="date"
            placeholder="选择日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="计划完成日期" prop="plannedCompletionDate">
          <el-date-picker
            v-model="form.plannedCompletionDate"
            type="date"
            placeholder="选择日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
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
        <!--        <el-form-item label="记录时间" prop="recordTime">-->
        <!--          <el-input v-model="form.recordTime"-->
        <!--                    placeholder="请输入记录时间"></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="登记人" prop="recordOperator">-->
        <!--          <el-input v-model="form.recordOperator"-->
        <!--                    placeholder="请输入登记人"></el-input>-->
        <!--        </el-form-item>-->
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
  import { fetchList, delObj, getObj, addObj, putObj, getHostTeams } from '@/api/sow/projectTable/index'
  import { mapGetters } from 'vuex'
  import { getDictListByParentValue } from '@/api/dict.js'

  export default {
    name: 'sow',
    data() {
      return {
        form: {
          projectTypes: []
        },
        rules: {},
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          current: 1,
          size: 10,
          projectNo: undefined,
          hostTeam: undefined,
          projectManager: undefined,
          projectType: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        sow_projectTable_select: false,
        sow_projectTable_update: false,
        sow_projectTable_delete: false,
        sow_projectTable_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        projectTypesOptions: [],
        projectTypesOptionsMap: {},
        projectTypes: [],
        isDisabled: {
          0: false,
          1: true
        },
        hostTeams: []

      }
    },
    mounted() {
      this.getListProjectTypes()
      this.getList()
      this.sow_projectTable_select = this.permissions['/sow/projectTable:select']
      this.sow_projectTable_update = this.permissions['/sow/projectTable:update']
      this.sow_projectTable_delete = this.permissions['/sow/projectTable:delete']
      this.sow_projectTable_add = this.permissions['/sow/projectTable:add']
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
      handleSearch() {
        this.listQuery.current = 1
        this.getList()
      },
      refreshHandle() {
        this.listQuery.current = 1
        this.listQuery.size = 10
        this.listQuery.username = ''
        this.getList()
      },
      handleFilter() {
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleAdd() {
        this.resetTemp()
        this.getListProjectTypes()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        this.dialogStatus = 'update'
        this.getListProjectTypes()
        getObj(row.projectNo).then(response => {
          this.form = response.data
          this.dialogFormVisible = true
          this.dialogStatus = 'update'
          // this.role = []
          // for (var i = 0; i < row.sysRoleVoList.length; i++) {
          //   this.role[i] = row.sysRoleVoList[i].roleId
          // }
          this.dialogFormVisible = true
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
            putObj(this.form).then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
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
      },
      async getListProjectTypes() {
        const params = {
          value: 'project_type'
        }
        getDictListByParentValue(params).then(response => {
          this.projectTypesOptions = response.data
          // console.log(this.projectTypesOptions)
        })
        getHostTeams().then(response => {
          this.hostTeams = response.data
          console.log(this.hostTeams)
        })
      },
      projectTypeName(row, column) {
        let name = row.projectType
        // console.log('================================')
        // console.log(JSON.stringify(this.projectTypesOptions))
        // console.log('================================')
        for (const item of this.projectTypesOptions) {
          if (name === item.value) {
            // console.log(item)
            name = item.desc
          }
        }
        return name
      },
      handleSearchClean() {
        this.listQuery.projectNo = undefined
        this.listQuery.hostTeam = undefined
        this.listQuery.projectManager = undefined
        this.listQuery.projectType = undefined
      }
    }
  }
</script>
