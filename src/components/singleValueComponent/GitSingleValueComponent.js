import {BaseComponent} from 'dash-component'
import * as transform from 'dash-transform'



export class GitSingleValueComponent extends BaseComponent
{
    caption = 'PushEvents in last call';
    value = 'NaDa';

    constructor()
    {
        super();
    }

    activate(model)
    {
        super.activate(model);


        var lib = new transform.TransformLibrary();

        this.stream = new transform.Stream(lib.getPipeWrapped('githubEventsToCount'));

        this.stream.subscribe((o)=>{
            this.value = o;
        });

        this.stream.start({interval: 3000});
    }

    detached()
    {
        this.stream.stop();
    }
}
