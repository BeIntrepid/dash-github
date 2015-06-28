// This is the file that's run when referenced, so if you want to expose something import it then export it here

//import {serviceLocator} from './serviceLocator'
export {GitSingleValueComponent} from './components/singleValueComponent/GitSingleValueComponent'

import * as registerPipes from './pipes/pipes'

registerPipes.registerPipes();