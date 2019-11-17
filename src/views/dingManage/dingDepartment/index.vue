<template>
  <div>
    <div class="search-container">
      <el-button v-if="dingManage_dingDepartment_select" class="search-btn" type="primary" icon="el-icon-search"
                 @click="handleSearch">查询
      </el-button>
      <el-button v-if="dingManage_dingDepartment_add" class="search-btn" type="primary" icon="el-icon-plus"
                 @click="handleAdd">添加
      </el-button>
      <el-button v-if="dingManage_dingDepartment_select" class="search-btn" :autofocus="true" icon="el-icon-refresh"
                 @click="refreshHandle">刷新
      </el-button>
    </div>

    <el-table v-if="dingManage_dingDepartment_select" v-loading="listLoading" :data="list"
              :default-sort="{prop : 'id' }" border highlight-current-row fit>
      <el-table-column align="center" type="index" width="50"></el-table-column>

      <el-table-column align="center" label="公司代码" width="200px" prop="corpId"></el-table-column>
      <el-table-column align="center" label="id" width="65" prop="id"></el-table-column>
      <el-table-column align="center" label="部门名称" width="200px" prop="name"></el-table-column>
      <el-table-column align="center" label="父部门编号" width="200px" prop="parentId"></el-table-column>
      <el-table-column align="center" label="同级部门排序" width="200px" prop="order"></el-table-column>
      <el-table-column align="center" label="已组建企业群" width="200px" prop="createDeptGroup"></el-table-column>
      <el-table-column align="center" label="新员工自己进群" width="200px" prop="autoAddUser"></el-table-column>
      <el-table-column align="center" label="隐藏部门" width="200px" prop="deptHiding"></el-table-column>
      <el-table-column align="center" label="隐藏部门的可视部门列表" width="200px" prop="deptPermits"></el-table-column>
      <el-table-column align="center" label="隐藏部门的可视用户列表" width="200px" prop="userPermits"></el-table-column>
      <el-table-column align="center" label="仅查可视部门内员工" width="200px" prop="outerDept"></el-table-column>
      <el-table-column align="center" label="可视外部部门列表" width="200px" prop="outerPermitDepts"></el-table-column>
      <el-table-column align="center" label="可视外部用户列表" width="200px" prop="outerPermitUsers"></el-table-column>
      <el-table-column align="center" label="企业群群主" width="200px" prop="orgDeptOwner"></el-table-column>
      <el-table-column align="center" label="管理员列表" width="200px" prop="deptManagerUseridList"></el-table-column>
      <el-table-column align="center" label="部门标识号" width="200px" prop="sourceIdentifier"></el-table-column>
      <el-table-column align="center" label="是否包含子部门" width="200px" prop="groupContainSubDept"></el-table-column>
      <el-table-column align="center" label="操作" width="180"
                       v-if="dingManage_dingDepartment_update  || dingManage_dingDepartment_delete ">
        <template slot-scope="scope">
          <el-button v-if="dingManage_dingDepartment_update" size="mini" type="primary" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button v-if="dingManage_dingDepartment_delete" size="mini" type="danger" @click="handleDelete(scope.row)">
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
        <el-form-item label="公司代码" prop="corpId">
          <el-input v-model="form.corpId"
                    placeholder="请输入公司代码"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name"
                    placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="父部门编号" prop="parentId">
          <el-input v-model="form.parentId"
                    placeholder="请输入父部门编号"></el-input>
        </el-form-item>
        <el-form-item label="同级部门排序" prop="order">
          <el-input v-model="form.order"
                    placeholder="请输入同级部门排序"></el-input>
        </el-form-item>
        <el-form-item label="已组建企业群" prop="createDeptGroup">
          <el-input v-model="form.createDeptGroup"
                    placeholder="请输入已组建企业群"></el-input>
        </el-form-item>
        <el-form-item label="新员工自己进群" prop="autoAddUser">
          <el-input v-model="form.autoAddUser"
                    placeholder="请输入新员工自己进群"></el-input>
        </el-form-item>
        <el-form-item label="隐藏部门" prop="deptHiding">
          <el-input v-model="form.deptHiding"
                    placeholder="请输入隐藏部门"></el-input>
        </el-form-item>
        <el-form-item label="隐藏部门的可视部门列表" prop="deptPermits">
          <el-input v-model="form.deptPermits"
                    placeholder="请输入隐藏部门的可视部门列表"></el-input>
        </el-form-item>
        <el-form-item label="隐藏部门的可视用户列表" prop="userPermits">
          <el-input v-model="form.userPermits"
                    placeholder="请输入隐藏部门的可视用户列表"></el-input>
        </el-form-item>
        <el-form-item label="仅查可视部门内员工" prop="outerDept">
          <el-input v-model="form.outerDept"
                    placeholder="请输入仅查可视部门内员工"></el-input>
        </el-form-item>
        <el-form-item label="可视外部部门列表" prop="outerPermitDepts">
          <el-input v-model="form.outerPermitDepts"
                    placeholder="请输入可视外部部门列表"></el-input>
        </el-form-item>
        <el-form-item label="可视外部用户列表" prop="outerPermitUsers">
          <el-input v-model="form.outerPermitUsers"
                    placeholder="请输入可视外部用户列表"></el-input>
        </el-form-item>
        <el-form-item label="企业群群主" prop="orgDeptOwner">
          <el-input v-model="form.orgDeptOwner"
                    placeholder="请输入企业群群主"></el-input>
        </el-form-item>
        <el-form-item label="管理员列表" prop="deptManagerUseridList">
          <el-input v-model="form.deptManagerUseridList"
                    placeholder="请输入管理员列表"></el-input>
        </el-form-item>
        <el-form-item label="部门标识号" prop="sourceIdentifier">
          <el-input v-model="form.sourceIdentifier"
                    placeholder="请输入部门标识号"></el-input>
        </el-form-item>
        <el-form-item label="是否包含子部门" prop="groupContainSubDept">
          <el-input v-model="form.groupContainSubDept"
                    placeholder="请输入是否包含子部门"></el-input>
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

  import { fetchList, delObj, getObj, addObj, putObj } from '@/api/dingManage/dingDepartment/index'
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
        dingManage_dingDepartment_select: false,
        dingManage_dingDepartment_update: false,
        dingManage_dingDepartment_delete: false,
        dingManage_dingDepartment_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted() {
      this.getList()
      this.dingManage_dingDepartment_select = this.permissions['/dingManage/dingDepartment:select']
      this.dingManage_dingDepartment_update = this.permissions['/dingManage/dingDepartment:update']
      this.dingManage_dingDepartment_delete = this.permissions['/dingManage/dingDepartment:delete']
      this.dingManage_dingDepartment_add = this.permissions['/dingManage/dingDepartment:add']
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
        getObj(row.id)
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
