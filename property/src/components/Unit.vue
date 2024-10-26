<template>
    <div class="unitmain">
        <div class="top">
            <el-input v-model="communityname" placeholder="小区名称"></el-input>
            <el-input v-model="unitname" placeholder="单元名称"></el-input>
            <el-date-picker v-model="value2" format="yyyy-MM-dd" align="right" type="date" placeholder="选择日期"
                :picker-options="pickerOptions">
            </el-date-picker>
            <el-select v-model="value" placeholder="选择状态" style="margin-left: 10px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" style="margin-left: 80px; font-size: 14px; " icon="el-icon-search"
                @click="handleSearch"></el-button>
            <el-button type="success" icon="el-icon-plus" style="width: 8%; font-size: 14px;"
                @click="handleAdd">录入</el-button>
            <el-button type="primary" icon="el-icon-refresh-right" style="font-size: 14px; width: 8%;"
                @click="reset">重置</el-button>
        </div>
        <div class="table">
            <el-table :data="tableData" stripe style="width: 100%;margin-top:20px" border>
                <el-table-column prop="communityname" label="小区名称" min-width="290">
                </el-table-column>
                <el-table-column prop="unitname" label="单元名称" min-width="290">
                </el-table-column>
                <el-table-column prop="unitnum" label="栋数" min-width="170">
                </el-table-column>
                <el-table-column prop="createtime" label="创建时间" min-width="290">
                </el-table-column>
                <el-table-column prop="unitstatus" label="状态" min-width="190">
                    <template v-slot="scope">
                        {{ scope.row.unitstatus === 1 ? '已建成' : '未建成' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="220">
                    <template slot-scope="scope">
                        <el-button @click="handleDetail(scope.row.id)" type="text" size="small">
                            <el-tag color="white">详情</el-tag>
                        </el-button>
                        <el-button type="text" size="small" @click="handleDel(scope.row.id)">
                            <el-tag type="danger">归档</el-tag>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="block" style="text-align: right; margin-top: 20px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="10"
                    layout="total, sizes, prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: null,
            currentPage: 1,
            pageNum: 10,
            currPage: 1,
            tableData: [],
            input: '',
            createtime: '',
            communityname: '',
            unitname: '',
            unitstatus: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            value2: '',
            options: [{
                value: '1',
                label: '已建成'
            }, {
                value: '2',
                label: '未建成'
            },],
            value: '',
            value3: ''
        }
    },
    mounted() {
        this.handleGetList()
    },
    methods: {
        // 获取列表
        async handleGetList() {
            const { data: res } = await this.axios.get("http://community.byesame.com/house/gethouseList", {
                params: {
                    pageNum: this.pageNum,
                    currPage: this.currPage - 1
                }
            });
            console.log(res);
            res.data.forEach(item => {
                item.createtime = this.formatCreateTime(item.createtime);
            });
            console.log(res);
            this.tableData = res.data;
            this.total = res.total
        },

        // 查询
        async handleSearch() {
            console.log(this.value2);
            this.value3 = this.formatDate(this.value2);
            console.log(this.value3);
            const { data: res } = await this.axios.get("http://community.byesame.com/house/searchList", {
                params: {
                    id: this.id,
                    communityname: this.communityname,
                    unitname: this.unitname,
                    createDt: this.value3,
                    value: this.value,
                    currPage: this.currPage,
                    pageNum: this.pageNum
                }
            });
            console.log(res);
            res.data.forEach(item => {
                item.createtime = this.formatCreateTime(item.createtime);
            });
            this.tableData = res.data
            this.total = res.total
        },

        // 录入
        handleAdd() {
            this.$router.push({
                name: 'Add',
                query: {
                    type: 'ADD'
                }
            })
        },
        // 删除提示框
        handleDel(id) {
            this.$confirm("是否删除该条数据?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.deleteTeam(id);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 删除
        async deleteTeam(id) {
            const { data: res } = await this.axios.get("http://community.byesame.com/house/delunitList", {
                params: {
                    id: id
                }
            });
            console.log(res);
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            this.handleGetList();
        },
        // 详情
        handleDetail(id) {
            this.axios({
                url: 'http://community.byesame.com/house/getDetailId',
                method: 'get',
                params: {
                    id: id,
                    token: sessionStorage.token
                }
            }).then(() => {
                // console.log(res);
                this.$router.push({
                    name: 'Detail',
                    query: {
                        id: id
                    }
                })
            })
        },

        // 重置
        async reset() {
            this.communityname = '',
                this.unitname = '',
                this.value = '',
                this.value2 = '',
                this.handleSearch()
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageNum = val
            this.handleSearch()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currPage = val
            this.handleSearch()

        },
        // 时间格式化
        formatCreateTime(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString.replace("T", " ").replace("Z", ""));
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        },
        // 时间格式化2
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
    },
}
</script>

<style lang="scss">
.unitmain {
    background-color: rgba(240, 240, 240);
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
}

.el-input {
    width: 264px;
    font-size: 14px;
    margin-left: 10px;
}

.top {
    background-color: white;
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
}

.unitmain::v-deep {
    .top {
        .el-input {
            width: 264px;
            font-size: 14px;
            margin-left: 10px;

            &:nth-child(1) {
                margin-left: 0;
            }

            input {
                height: 36px;
            }
        }
    }

    .table {
        .has-gutter {
            .el-table__cell {
                background: rgb(238, 241, 246);
                border-color: rgb(223, 230, 236);
                text-align: center;
                font-size: 14px;
                color: #000;
            }
        }

        .el-table__cell {
            text-align: center;
            font-size: 14px;
            color: #000;
        }

        .el-button--small {
            border-radius: 5px;
            height: 27px;
        }

        .el-button {
            height: 30px !important;
            padding-top: 0;

            .el-tag--small {
                padding: 10px 15px;
                line-height: 5px;
                height: 25px;
            }
        }
    }
}
</style>