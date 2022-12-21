import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamplePageComponent } from './pages/example/example-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { RoastRoomPageComponent } from './pages/roast-room/roast-room-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'example', component: ExamplePageComponent },
  { path: 'roast-room/:id', component: RoastRoomPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
