<template>
  <div class="contain">
    <div class="tab">
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="菜单列表" name="menu" style='background-color:white'>
          <div class="down-form">
            <div class="table">
              <el-table ref="logTable" :data="tableData" v-loading="loading" stripe
                :header-cell-style="{ 'background': '#eef1f6', 'color': '#1f2d3d', 'border-color': '#dfe6ec' }"
                style="width: 100%;font-size: 14px;color: #1f2d3d">
                <el-table-column type="index" label="编码" align="center" width="150">
                </el-table-column>
                <el-table-column prop="title" label="菜单名称" min-width="13%" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="prentId" label="菜单级别" :formatter="typeFormatter" min-width="13%"
                  show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="desc" label="菜单描述" min-width="18%" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="" label="操作" min-width="19%" align="center">
                  <template slot-scope="scope">
                    <div style="display: flex;margin-left: 3px">
                      <el-button :plain="true" size="mini" type="primary" style="" @click="detail(scope.row)"><i
                          class="el-icon-zoom-in"></i>查看下一级</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="block">
              <el-pagination @current-change="handleCurrentChange" layout="total,sizes,prev,pager,next,jumper"
                :current-page.sync="iPagination.current" :page-size='iPagination.pageSize'
                :page-sizes="iPagination.pageSizeOptions" :total="iPagination.total" @size-change="handleSizeChange">
              </el-pagination>
            </div>
            <!-- <poster-dialog ref="posterDialog"></poster-dialog> -->
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "menuData",
  data() {
    return {
      activeName: 'menu',
      tableData: [],
      iPagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: [7, 10, 20, 50],
        total: 0,
      },
      loading: false,
    }
  },
  mounted() {
    this.getMenuData()
  },
  methods: {
    // 分页导航
    handleSizeChange(val) {
      this.iPagination.pageSize = val;
      this.getMenuData()
    },
    handleCurrentChange(val) {
      this.iPagination.current = val;
      this.getMenuData()
    },
    getMenuData() {
      this.axios({
        url: 'http://community.byesame.com/admin/getMenuData',
        method: 'get',
        params: {
          prentId: 0,
          currPage: this.iPagination.current - 1,
          pageNum: this.iPagination.pageSize,
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
      })
    },
    // 获取二级菜单
    detail(row) {
      console.log(row)
      this.$router.push({
        name: 'menuSecond',
        query: {
          prentId: row.id
        }
      })
    },

    // 级别转文字
    typeFormatter(row) {
      const prentId = row.prentId
      if (prentId == 0) {
        return '一级'
      } else {
        return '二级'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block {
  float: right;
  margin-top: 10px;
}

.el-button {
  width: 32%;
  color: #fff;
  font-size: 12px;
  background-color: #20a0ff;
  border-color: #20a0ff;
  margin-left: 34%;

}
</style>