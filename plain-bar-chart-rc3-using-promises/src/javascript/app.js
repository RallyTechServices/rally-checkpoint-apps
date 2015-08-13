Ext.define("TSBarChart", {
    extend: 'Rally.app.App',
    componentCls: 'app',
    logger: new Rally.technicalservices.Logger(),
    defaults: { margin: 10 },
    items: [
        {xtype:'container',itemId:'display_box'}
    ],
    
    launch: function() {
        var me = this;
        var model_name = 'Defect',
            field_names = ['Name','State'];
        
        this._loadAStoreWithAPromise(model_name, field_names).then({
            scope: this,
            success: function(store) {
                this._makeChart();
            },
            failure: function(error_message){
                alert(error_message);
            }
        }).always(function() {
            me.setLoading(false);
        });
    },
    _loadAStoreWithAPromise: function(model_name, model_fields){
        var deferred = Ext.create('Deft.Deferred');
        var me = this;
        this.logger.log("Starting load:",model_name,model_fields);
          
        Ext.create('Rally.data.wsapi.Store', {
            model: model_name,
            fetch: model_fields
        }).load({
            callback : function(records, operation, successful) {
                if (successful){
                    deferred.resolve(this);
                } else {
                    me.logger.log("Failed: ", operation);
                    deferred.reject('Problem loading: ' + operation.error.errors.join('. '));
                }
            }
        });
        return deferred.promise;
    }, 
    _makeChart: function() {
       var categories = ["Wilma","Fred","Pebbles"];
        
        var series = [
            {type:'column',name:'A Series 2',data:[5,0,7],stack:3},
            {type:'line',name:'A Series',data:[5,null,7],stack:3},
            {type:'column',name:'Another One', data:[3,5,12], stack: 1},
            {type:'column',name:'Another Series',data:[1,6,3],stack:1}
        ];
        
        this.down('#display_box').add({
            xtype:'rallychart',
            chartData: {
                series: series
            },
            chartColors: ['red','blue','green','yellow'],
            chartConfig: {
                chart: {},
                title: {
                    text: 'title',
                    align: 'center'
                },
                xAxis: [{
                    categories:  categories,
                    labels: {
                        align: 'left',
                        rotation: 70
                    }
                }],
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                }
            }
        });
    }
});
