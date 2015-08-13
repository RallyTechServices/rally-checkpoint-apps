Ext.define("TSBarChart", {
    extend: 'Rally.app.App',
    componentCls: 'app',
    logger: new Rally.technicalservices.Logger(),
    defaults: { margin: 10 },
    items: [
        {xtype:'container',  itemId : 'selector_box'},
        {xtype:'container',itemId:'display_box'}
    ],
    
    launch: function() {
        this.down('#selector_box').add({
            xtype: 'rallyiterationcombobox',
            listeners: {
                scope: this,
                select: this._makeChart
            }
        });
    },
    _makeChart: function() {
        this.down('#display_box').removeAll();
        
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
