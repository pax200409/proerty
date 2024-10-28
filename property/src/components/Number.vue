<template>
    <div class="box">
        <div class="top">
            <el-select :clearable="true" v-model="value" placeholder="入住状态">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-input v-model="unitname" placeholder="单元名称" clearable></el-input>
            <el-input v-model="buildnum" placeholder="幢号" clearable></el-input>
            <el-input v-model="homenum" placeholder="房号" clearable></el-input>
            <el-input v-model="homename" placeholder="住客姓名" clearable></el-input>
            <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;"
                @click="handleSearch">查询</el-button>
            <el-button type="success" icon="el-icon-upload2" @click="handleDaochu">批量导出</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDelete">批量删除</el-button>
        </div>
        <div class="tab">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="序号" width="110" prop="index" type="index">
                </el-table-column>
                <el-table-column prop="unitname" label="单元名称" width="200">
                </el-table-column>
                <el-table-column prop="buildnum" label="幢号" width="170">
                    <template v-slot="scope">
                        {{ scope.row.buildnum == null ? '暂无' : scope.row.buildnum }}
                    </template>
                </el-table-column>
                <el-table-column prop="storeynum" label="楼层号" width="180">
                    <template v-slot="scope">
                        {{ scope.row.storeynum == null ? '暂无' : scope.row.storeynum }}
                    </template>
                </el-table-column>
                <el-table-column prop="homenum" label="房号" width="220">
                    <template v-slot="scope">
                        {{ scope.row.homenum == null ? '暂无' : scope.row.homenum }}
                    </template>
                </el-table-column>
                <el-table-column prop="homename" label="住客姓名" width="220">
                    <template v-slot="scope">
                        {{ scope.row.homename == null ? '暂无' : scope.row.homename }}
                    </template>
                </el-table-column>
                <el-table-column prop="unitstatus" label="状态" width="160">
                    <template v-slot="scope">
                        {{ scope.row.unitstatus == 2 ? '已入住' : '未入住' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="160">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row.id)">
                            <el-tag color="white">编辑</el-tag>
                        </el-button>
                        <el-button type="text" size="small" style="color: black;" @click="handleDel(scope.row.id)">
                            <el-tag type="danger">删除</el-tag>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="block" style="text-align: right ; margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage4" :page-sizes="[7, 10, 20, 50]" :page-size="10"
                layout="total, sizes, prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export default {
    // 标识,当前组件的名称
    name: "user",
    data() {
        return {
            input: '',
            options: [{
                value: '1',
                label: '已入住'
            },
            {
                value: '2',
                label: '未入住'
            }],
            value: '',
            total: null,
            index: '',
            unitname: '',
            homenum: '',
            homename: '',
            storeynum: '',
            unitstatus: '',
            buildnum: '',
            pageNum: '10',
            currPage: '1',
            currentPage4: 1,
            tableData: [],
            multipleSelection: [],
            daochu: [{
                unitname: this.unitname,
                homenum: this.homenum,
                homename: this.homename,
                storeynum: this.storeynum,
                unitstatus: this.unitstatus,
            }]
        }
    },
    mounted() {
        this.handleGetList()
    },
    methods: {
        //获取列表
        handleGetList() {
            this.axios({
                url: 'http://community.byesame.com/house/gethouseList',
                method: 'get',
                params: {
                    pageNum: this.pageNum,
                    currPage: this.currPage - 1
                }
            }).then(res => {
                console.log(res);
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        // 查询
        handleSearch() {
            this.axios({
                url: 'http://community.byesame.com/house/searchnumList',
                method: 'get',
                params: {
                    homestatus: this.value,
                    unitname: this.unitname,
                    buildnum: this.buildnum,
                    homenum: this.homenum,
                    homename: this.homename,
                    currPage: this.currPage - 1,
                    pageNum: this.pageNum,
                    token: sessionStorage.toekn
                }
            }).then(res => {
                console.log(res);
                this.tableData = res.data.data;
                this.total = res.data.total;
            })
        },
        // 编辑
        handleEdit(id) {
            this.$router.push({
                name: 'Edit',
                query: { type: 'DETAIL', editId: id }
            })
        },
        // 删除
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
                    id: id,
                    token: sessionStorage.toekn
                }
            });
            console.log(res);
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            this.handleGetList();
        },
        // 删除
        async deleteTeam1(id) {
            const { data: res } = await this.axios.get("http://community.byesame.com/house/delnumList", {
                params: {
                    ids: id,
                    token: sessionStorage.token
                }
            });
            console.log(res);
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            this.handleGetList();
        },
        // 批量删除
        handleDelete() {
            if (this.multipleSelection.length === 0) {
                this.$message.error('请选择要删除的行');
                return;
            }
            this.$confirm('确定删除选中的单元信息？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                const idsToDelete = this.multipleSelection.map(item => item.id); // 通过map方法遍历多选集合，生成一个只包含id的数组
                this.deleteTeam1(idsToDelete);
            })
        },
        // 导出
        handleDaochu() {
            // 创建一个workbook
            const workbook = XLSX.utils.book_new();
            // 导出数据
            const worksheet = XLSX.utils.json_to_sheet(this.daochu);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

            // 将workbook转为二进制数据
            const excelData = XLSX.write(workbook, {
                type: "array",
                bookType: "xlsx",
            });
            // 创建blob对象并保存excel文件
            const blob = new Blob([excelData], { type: "application/octet-stream" });
            // 设置导出文件名字
            saveAs(blob, "数据列表.xlsx");
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageNum = val
            this.handleGetList()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currPage = val
            this.handleGetList()
        },
        // 表格
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;//设置多项选择的值
        }
    },
}
</script>
<style lang="scss" scoped>
.box::v-deep {
    .top {
        .el-select {
            width: 15%;

            .el-input {
                width: 100%;
            }
        }

        .el-input {
            font-size: 12px;
            width: 15%;
            margin-left: 10px;

            &:nth-child(1) {
                margin-left: 0;
            }
        }

        .btn {
            width: 20%;
            display: inline-block;
        }
    }

    .tab {
        margin-top: 30px;

        .el-table {
            text-align: center;
            color: black;
        }

        .el-table--border th.el-table__cell,
        .el-table__fixed-right-patch {
            color: black;
            background: #eef1f6;
            text-align: center;
            font-size: 14px;
        }

        .el-table__cell {
            font-size: 14px;
            text-align: center;
        }

        .el-tag.el-tag--danger {
            background: #fff;
            color: black;
        }
    }
}
</style>