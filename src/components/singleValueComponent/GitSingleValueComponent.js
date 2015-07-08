import {BaseComponent} from 'dash-component'
import * as transform from 'dash-transform'
import {gitStyle} from '../../styles/gitStyle.css!css'



export class GitSingleValueComponent extends BaseComponent
{
    caption = 'PushEvents in last call';
    value = 'NaDa';

    constructor()
    {
        super();
    }

    switchType(type)
    {
        this.stream.streamModel.eventType = type;
    }

    activate(model)
    {
        super.activate(model);


        var lib = new transform.TransformLibrary();

        this.stream = new transform.Stream(lib.getPipeWrapped('githubEventsToCount'));

        this.stream.build();
        var inputs = this.stream.getMapInputs();

        this.stream.streamModel.addMapping('eventType',inputs.githubEventsToCount_jsonGithubEventsToCount.forInput('eventType'));
        this.stream.streamModel.eventType = ()=>{return 'PushEvent'};

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
