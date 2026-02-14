import { Routes } from '@angular/router';
import { ChatScreen } from './pages/chat-screen/chat-screen';

export const routes: Routes = [
    {path:'', redirectTo: 'chat', pathMatch: 'full'},
    {path:'chat', component: ChatScreen}
];
