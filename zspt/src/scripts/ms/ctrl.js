var msCtrl = angular.module("mx.msCtrl",[]);

msCtrl.controller('homeCtrl', function($scope,TipService) {
    var infoText = "主页信息";
    TipService.setRouter(infoText,[{
        sref : 'mxsoft.home',
        title:'主页'
    }]);
});

msCtrl.controller('depCtrl', function($scope, $rootScope, $modal,TipService) {
    var infoText = "部门信息";
    TipService.setRouter(infoText,[{
        sref : 'mxsoft.department',
        title:'部门管理'
    }]);
    $scope.pageInfo = {
        pageNum : 1,
        pageSize: 10,
        totalCount:10,
        maxSize:5,
        result: null
    }
    $scope.searchForm = {
        depName : '',
        dateTime: null
    }
    /* 主页面查询封装 Start */
    $scope.init = function(searchForm){
        $scope.pageInfo.totalCount = 200;
        $scope.pageInfo.result = [
        {depName:'测试1号',type:'测试类型',describe:'我是描述'},
        {depName:'测试1号',type:'测试类型',describe:'我是描述'},
        {depName:'测试1号',type:'测试类型',describe:'我是描述'},
        {depName:'测试1号',type:'测试类型',describe:'我是描述'},
        {depName:'测试1号',type:'测试类型',describe:'我是描述'},
        {depName:'测试1号',type:'测试类型',describe:'我是描述'},
        {depName:'测试1号',type:'测试类型',describe:'我是描述'},
        {depName:'测试1号',type:'测试类型',describe:'我是描述'},
        {depName:'测试1号',type:'测试类型',describe:'我是描述'},
        {depName:'测试2号',type:'测试类型',describe:'我是描述'}
        ]
    };
    /* 主页面查询封装 END */

    /* 查询按钮封装 Start */
    $scope.research = function(){
        $scope.searchForm = {
            depName : '',
            dateTime: null
        }
    };
    $scope.search = function(){
        $scope.init($scope.searchForm);
    };
    $scope.search();
    /* 查询按钮封装 END */

    /* 新增 修改 查看弹出框 type = 1 查看 type = 2 修改 Start */
    $scope.openModal = function(data,type) {
        var modalInstance = $modal.open({
            keyboard : false,
            backdrop : 'static',
            templateUrl : 'views/department/saveOrUpdate.html',//填写弹出框的路径
            controller : function($scope, $modalInstance) {
                $scope.formInfo = {
                    title: '新增'+infoText,
                    buttonName: '新增',
                    submitText: '表单',
                    isSubmit: false,
                    type: type,
                    testDepName: true,
                    data: {}
                };
                if(type === 1){
                    $scope.formInfo.title = '查看'+infoText;
                    $scope.formInfo.buttonName = '确定';
                    //创建副本再进行操作
                    $scope.formInfo.data = angular.copy(data);
                }else if(type === 2){
                    $scope.formInfo.title = '修改'+infoText;
                    $scope.formInfo.buttonName = '修改';
                    //创建副本再进行操作
                    $scope.formInfo.data = angular.copy(data);
                }

                //在这里处理要进行的操作
                $scope.submit = function() {
                    $scope.formInfo.submitText = "提交中";
                    $scope.formInfo.isSubmit = true;
                    TipService.setMessage("新增成功","success",infoText)
                    $modalInstance.close();
                };
                $scope.cancel = function() {
                    $modalInstance.close();
                }
            }
        });
    };
    /* 新增 修改 查看弹出框 END */

    /* 删除弹出框 Start */
    $scope.openDeleteModal = function(data) {
        var modalInstance = $modal.open({
            keyboard : false,
            backdrop : 'static',
            size : 'sm',
            templateUrl : 'views/tmpl/deleteModal.html',//填写弹出框的路径
            controller : function($scope, $modalInstance) {
                $scope.formInfo = {
                    title: data.depName,
                    isSubmit: false,
                    data: data
                };

                //在这里处理要进行的操作
                $scope.submit = function() {
                    console.log($scope.formInfo.data)
                    $modalInstance.close();
                };
                $scope.cancel = function() {
                    $modalInstance.close();
                }
            }
        });
    };
    /* 删除弹出框 END */
});