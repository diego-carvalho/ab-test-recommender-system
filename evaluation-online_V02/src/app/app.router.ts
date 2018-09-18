import { HomeComponent } from './home/home.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { FourComponent } from './four/four.component';
import { UserInfoComponent } from './userinfo/userinfo.component';
import { EndComponent } from './end/end.component';

import { ThreeEnComponent } from './three-en/three-en.component';

export const APP_ROUTES = [
  { path: '', component: HomeComponent },
  { path: 'two', component: TwoComponent },
  { path: 'three', component: ThreeComponent },
  { path: 'four', component: FourComponent },
  { path: 'userinfo', component: UserInfoComponent },
  { path: 'end', component: EndComponent },
  { path: 'threeEn', component: ThreeEnComponent },
];
