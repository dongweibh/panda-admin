<template>
  <div>
    <div class="search-container">
      <el-button v-if="dingManage_dingUser_select" class="search-btn" type="primary" icon="el-icon-search" @click="handleSearch">
        查询
      </el-button>
      <el-button v-if="dingManage_dingUser_add" class="search-btn" type="primary" icon="el-icon-plus" @click="handleAdd">添加
      </el-button>
      <el-button v-if="dingManage_dingUser_select" class="search-btn" :autofocus="true" icon="el-icon-refresh"
                 @click="refreshHandle">刷新
      </el-button>
    </div>

    <el-table v-if="dingManage_dingUser_select" v-loading="listLoading" :data="list" :default-sort="{prop : 'userid' }" border
              highlight-current-row fit>
      <el-table-column align="center" type="index" width="50"></el-table-column>

      <el-table-column align="center" label="userid" width="65" prop="userid"></el-table-column>
      <el-table-column align="center" label="应用内用户号" width="200px" prop="unionid"></el-table-column>
      <el-table-column align="center" label="姓名" width="200px" prop="name"></el-table-column>
      <el-table-column align="center" label="分机号" width="200px" prop="tel"></el-table-column>
      <el-table-column align="center" label="办公地点" width="200px" prop="workPlace"></el-table-column>
      <el-table-column align="center" label="备注" width="200px" prop="remark"></el-table-column>
      <el-table-column align="center" label="手机号" width="200px" prop="mobile"></el-table-column>
      <el-table-column align="center" label="电子邮箱" width="200px" prop="email"></el-table-column>
      <el-table-column align="center" label="企业邮箱" width="200px" prop="orgEmail"></el-table-column>
      <el-table-column align="center" label="激活状态" width="200px" prop="isActive"></el-table-column>
      <el-table-column align="center" label="排序" width="200px" prop="orderInDepts"></el-table-column>
      <el-table-column align="center" label="管理员标志" width="200px" prop="isAdmin"></el-table-column>
      <el-table-column align="center" label="老板标志" width="200px" prop="isBoss"></el-table-column>
      <el-table-column align="center" label="部门主管列表" width="200px" prop="isLeaderInDepts"></el-table-column>
      <el-table-column align="center" label="是否隐藏号码" width="200px" prop="isHide"></el-table-column>
      <el-table-column align="center" label="所属部门列表" width="200px" prop="department"></el-table-column>
      <el-table-column align="center" label="职位信息" width="200px" prop="position"></el-table-column>
      <el-table-column align="center" label="头像" width="200px" prop="avatar"></el-table-column>
      <el-table-column align="center" label="入职时间" width="200px" prop="hiredDate"></el-table-column>
      <el-table-column align="center" label="员工工号" width="200px" prop="jobnumber"></el-table-column>
      <el-table-column align="center" label="扩展属性" width="200px" prop="extattr"></el-table-column>
      <el-table-column align="center" label="高管标志" width="200px" prop="isSenior"></el-table-column>
      <el-table-column align="center" label="国家代码" width="200px" prop="stateCode"></el-table-column>
      <el-table-column align="center" label="角色列表" width="200px" prop="roles"></el-table-column>
      <el-table-column align="center" label="身份证号码" width="200px" prop="idNo"></el-table-column>
      <el-table-column align="center" label="操作" width="180" v-if="dingManage_dingUser_update  || dingManage_dingUser_delete ">
        <template slot-scope="scope">
          <el-button v-if="dingManage_dingUser_update" size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button v-if="dingManage_dingUser_delete" size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
        <el-form-item label="应用内用户号" prop="unionid">
          <el-input v-model="form.unionid"
                    placeholder="请输入应用内用户号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"
                    placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="分机号" prop="tel">
          <el-input v-model="form.tel"
                    placeholder="请输入分机号"></el-input>
        </el-form-item>
        <el-form-item label="办公地点" prop="workPlace">
          <el-input v-model="form.workPlace"
                    placeholder="请输入办公地点"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark"
                    placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email"
                    placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱" prop="orgEmail">
          <el-input v-model="form.orgEmail"
                    placeholder="请输入企业邮箱"></el-input>
        </el-form-item>
        <el-form-item label="激活状态" prop="isActive">
          <el-input v-model="form.isActive"
                    placeholder="请输入激活状态"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderInDepts">
          <el-input v-model="form.orderInDepts"
                    placeholder="请输入排序"></el-input>
        </el-form-item>
        <el-form-item label="管理员标志" prop="isAdmin">
          <el-input v-model="form.isAdmin"
                    placeholder="请输入管理员标志"></el-input>
        </el-form-item>
        <el-form-item label="老板标志" prop="isBoss">
          <el-input v-model="form.isBoss"
                    placeholder="请输入老板标志"></el-input>
        </el-form-item>
        <el-form-item label="部门主管列表" prop="isLeaderInDepts">
          <el-input v-model="form.isLeaderInDepts"
                    placeholder="请输入部门主管列表"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏号码" prop="isHide">
          <el-input v-model="form.isHide"
                    placeholder="请输入是否隐藏号码"></el-input>
        </el-form-item>
        <el-form-item label="所属部门列表" prop="department">
          <el-input v-model="form.department"
                    placeholder="请输入所属部门列表"></el-input>
        </el-form-item>
        <el-form-item label="职位信息" prop="position">
          <el-input v-model="form.position"
                    placeholder="请输入职位信息"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="form.avatar"
                    placeholder="请输入头像"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="hiredDate">
          <el-input v-model="form.hiredDate"
                    placeholder="请输入入职时间"></el-input>
        </el-form-item>
        <el-form-item label="员工工号" prop="jobnumber">
          <el-input v-model="form.jobnumber"
                    placeholder="请输入员工工号"></el-input>
        </el-form-item>
        <el-form-item label="扩展属性" prop="extattr">
          <el-input v-model="form.extattr"
                    placeholder="请输入扩展属性"></el-input>
        </el-form-item>
        <el-form-item label="高管标志" prop="isSenior">
          <el-input v-model="form.isSenior"
                    placeholder="请输入高管标志"></el-input>
        </el-form-item>
        <el-form-item label="国家代码" prop="stateCode">
          <el-input v-model="form.stateCode"
                    placeholder="请输入国家代码"></el-input>
        </el-form-item>
        <el-form-item label="角色列表" prop="roles">
          <el-input v-model="form.roles"
                    placeholder="请输入角色列表"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idNo">
          <el-input v-model="form.idNo"
                    placeholder="请输入身份证号码"></el-input>
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

  import { fetchList, delObj, getObj, addObj, putObj } from '@/api/dingManage/dingUser/index'
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
        dingManage_dingUser_select: false,
        dingManage_dingUser_update: false,
        dingManage_dingUser_delete: false,
        dingManage_dingUser_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted() {
      this.getList()
      this.dingManage_dingUser_select = this.permissions['/dingManage/dingUser:select']
      this.dingManage_dingUser_update = this.permissions['/dingManage/dingUser:update']
      this.dingManage_dingUser_delete = this.permissions['/dingManage/dingUser:delete']
      this.dingManage_dingUser_add = this.permissions['/dingManage/dingUser:add']
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
        getObj(row.userid)
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
