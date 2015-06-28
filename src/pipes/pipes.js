import * as transform from 'dash-transform'
import {responses} from '../githubResponseCache'
import Enumerable from 'linq-es6'

export function registerPipes()
{
    var callGithubEvents = new transform.FunctionFilter('callGithubEvents', ()=> {
        var p = new Promise((res, rej)=> {

            res(JSON.stringify(responses[0]));
            return;

            fetch('https://api.github.com/events')
                .then((i)=> {
                    i.text().then((tin)=> {
                        res(tin);
                    });
                });
        });
        return p;
    });


    var toJson = new transform.FunctionFilter('toJson', (inputObj, input)=> {
        return JSON.parse(input);
    });

    var jsonGithubEventsToCount = new transform.FunctionFilter('jsonGithubEventsToCount', (inputObj, input)=> {
        return Enumerable(input).where((e)=> {
            return e.type == "PushEvent";
        }).count();
    });

    var pipe = new transform.Pipe('githubEventsToCount');

    pipe.add(callGithubEvents)
        .add(toJson)
        .add(jsonGithubEventsToCount);

    var lib = new transform.TransformLibrary();

    lib.registerPipe(pipe);
}