import { bootstrap} from '@angular/platform-browser-dynamic'
import { ExerciseService } from './Exercises/index'
import { AppComponent} from './App/app.component';
import { HTTP_PROVIDERS } from '@angular/http';
import { WorkoutService } from './Workout/index';

bootstrap(AppComponent,[HTTP_PROVIDERS]);

