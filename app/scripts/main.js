var ractive = new Ractive({
    el: '#container',
    template: '#template',
    data: {
        title: 'Progress bars',
        errorMsg: 'Please select',
        progress: ''
    },
    oninit: function () {
        var progressbars = {};
        $.get('https://pb-api.herokuapp.com/bars', function (progressbar) {
            ractive.set('progress', progressbar);
        });
    },
    countPrograss: function (percentage) {
        var self = this,
            selectedBar = self.get('selectedBar');

        if (selectedBar != null){
            var keypath = 'progress.bars['+selectedBar+']';
            self.add(keypath, percentage);
        }     
    }
});