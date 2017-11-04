import { HomeComponent } from './home/home.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { FourComponent } from './four/four.component';
import { FiveComponent } from './five/five.component';
import { SixComponent } from './six/six.component';
import { EndComponent } from './end/end.component';
import { OneComponent } from './one/one.component';

export const APP_ROUTES = [
  { path: '', component: HomeComponent },
  { path: 'one', component: OneComponent },
  { path: 'two', component: TwoComponent },
  { path: 'three', component: ThreeComponent },
  { path: 'four', component: FourComponent },
  { path: 'five', component: FiveComponent },
  { path: 'six', component: SixComponent },
  { path: 'end', component: EndComponent },
];
