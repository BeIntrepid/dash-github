import {BaseComponent} from 'dash-component'
import * as transform from 'dash-transform'
import Enumerable from 'linq-es6'


export class ImageGrid extends BaseComponent
{
    caption = 'PushEvents in last call';
    imageUrls = [];

    constructor()
    {
        super();
    }

    activate(model)
    {
        super.activate(model);


        var lib = new transform.TransformLibrary();

        this.stream = new transform.Stream(lib.getPipeWrapped('getGithubEventsAsJson'));

        this.stream.build();

        this.stream.subscribe((o)=>{
            this.imageUrls = Enumerable(o).select((e)=>{return e.actor.avatar_url}).toArray();
        });

        this.stream.start({interval: 3000});
    }

    detached()
    {
        this.stream.stop();
    }
}