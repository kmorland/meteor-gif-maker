Template.HomeComponent.onCreated(function(){
    //Reactive images array, holds the images from DragDropComponent
    this.images = new ReactiveArray();
    //Reactive gifPreview, holds the GIF image from the gifCreate method
    this.gifPreview = new ReactiveVar( null );
    //Reactive interval, holds the interval between frames used when creating the GIF
    this.interval = new ReactiveVar(0);
});

/**
 * Helper methods for the template
 */
Template.HomeComponent.helpers({

    /*inputCallback: function( index, data ) {
        var instance = Template.instance();
        return function(index, data) {
            let images = instance.images.get();
            console.log( index );
            images.push( data );
            //images.insert(index-1, data);
        }
    },*/
    /**
     * Callback from Drag and Drop
     */
    dragDropCallback: function( data ) {
        var instance = Template.instance();
        return function(data) {
            instance.images.push( data );
        }
    },
    /**
     * GifPreview, returns the base64 GIF
     */
    gifPreview: function() {
        return Template.instance().gifPreview.get();
    },
    /**
     * Logic in template to see if we show create GIF DIV
     */
    isImagesValid: function() {
        return ( Template.instance().images.get().length === 5 ) ? true : false;
    }
});
/**
 * Event Handler for HomeComponent
 */
Template.HomeComponent.events({
    /**
     * Creates the GIF from the upload/Drag and Dropped Images from the DragDropComponent
     */
    'click button.submit': function(ev, instance) {
        //Calls the gifshot library that is used to create the GIF
        gifshot.createGIF({
            'images': instance.images.get(),
            'interval': instance.interval.get()/1000,
            'width': 500, //Width and height seems not to work correctly
            'height': 500 //Width and height seems not to work correctly
        },function(obj) {
            console.log(obj);
            if(!obj.error) {
                instance.gifPreview.set( obj.image );
            }
        });
    },
    /**
     * Event Handler for the interval form field
     */
    'change input': function(ev, instance) {
        instance.interval.set( ev.target.value );
    }
});