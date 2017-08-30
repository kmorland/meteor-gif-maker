Template.DragDropComponent.onCreated(function(){
    //Reactive image array, holds the images
    this.images = new ReactiveArray();
});
/**
 * Event Listeners for the component
 */
Template.DragDropComponent.events({
    /**
     * Dragover Event, when an image is dragged onto DIV.
     */
    'dragover': function(ev, instance) {
        ev.preventDefault();
    },
    /**
     * Drop Event, when an image is dropped onto DIV.
     * @description Gets the file from the event, save the file returning base64 encoded image.
     */
    'drop': function(ev, instance) {
        ev.preventDefault();
        ev.stopPropagation();
        let file = ev.originalEvent.dataTransfer.files[0];
        Meteor.saveFile(file, file.name, null, null, function(ev){
            //Push dropped image to images array
            instance.images.push( ev.target.result );
            //Call the callback method to dispatch to parent component, the image that was just uploaded
            instance.data.callback( ev.target.result );
        });
    },
    /**
     * Click Event, for upload button.  Dispatches event to display file dialog.
     */
    'click i': function(ev, instance) {
        let elem = document.getElementById('fileUpload');
        if(elem && document.createEvent) {
            var evt = document.createEvent("MouseEvents");
            evt.initEvent("click", true, false);
            elem.dispatchEvent(evt);
        }
    },
    /**
     * Change Event, for file upload.
     */
    'change #fileUpload': function(ev, instance) {
        _.each(ev.target.files, function(file) {
            Meteor.saveFile(file, file.name, null, null, function(ev){
                //Push dropped image to images array
                instance.images.push( ev.target.result );
                //Call the callback method to dispatch to parent component, the image that was just uploaded
                instance.data.callback( ev.target.result );
            });
        });
    }

});

/**
 * Helpers method, returns variables used in the view
 * @author Kevin Morland
 */
Template.DragDropComponent.helpers({
    /**
     * Returns the images that have been upload or drag/drop for preview in template
     * @description Images array contains base64 images
     */
    images: function() {
        return Template.instance().images.get();
    },
    /**
     * Returns the count of the images that have been upload or drag/drop for preview in template
     */
    count: function() {
        return Template.instance().images.get().length;
    }
});