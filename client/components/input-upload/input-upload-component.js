Template.InputUploadComponent.onCreated(function(){
    this.imagePreview = new ReactiveVar(null);
});


Template.InputUploadComponent.events({
    
    'change input': function(ev, instance) {
        _.each(ev.target.files, function(file) {
            Meteor.saveFile(file, file.name, null, null, function(ev){
                instance.imagePreview.set( ev.target.result );
                instance.data.callback( instance.data.index, ev.target.result );
            });
        });
    }

});

Template.InputUploadComponent.helpers({

    isImagePreview: function(){
        return (Template.instance().imagePreview.get()) ? true : false;
    },

    imagePreview: function() {
        return Template.instance().imagePreview.get();
    }

});