import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { 
  AuthGuard, 
  redirectLoggedInTo, 
  redirectUnauthorizedTo 
} from '@angular/fire/auth-guard';

import { AboutComponent } from './site/about/about.component';
import { ContactComponent } from './site/contact/contact.component';
import { HomeComponent } from './site/home/home.component';
import { PricingComponent } from './site/pricing/pricing.component';

import { LoginComponent } from './auth/login/login.component';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { RegisterComponent } from './auth/register/register.component';

import { UserProfileComponent } from './user-profile/user-profile.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { StudentDashboardComponent } from './students/student-dashboard/student-dashboard.component';

import { SectionDashboardComponent } from './sections/section-dashboard/section-dashboard.component';

import { ToolDashboardComponent } from './tools/tool-dashboard/tool-dashboard.component';
import { ScoreGeneratorComponent } from './tools/score-generator/score-generator.component';
import { AverageCalculatorComponent } from './tools/average-calculator/average-calculator.component';

const redirectLoggedIn = () => redirectLoggedInTo('/dashboard');
const redirectUnauthorized = () => redirectUnauthorizedTo('/auth/login');

const routes: Routes = [
  // site routes
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'pricing', component: PricingComponent },

  // authentication related routes
  { path: 'auth', children: [
    { path: 'login', component: LoginComponent },
    { path: 'password-recovery', component: PasswordRecoveryComponent },
    { path: 'register', component: RegisterComponent },
  ], canActivate: [AuthGuard], data: { authGuardPipe: redirectLoggedIn } },

  { path: 'users/profile', component: UserProfileComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorized } },

  // Students routes
  { path: 'students', component: StudentDashboardComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorized } },

  // Sections routes
  { path: 'sections', component: SectionDashboardComponent, canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorized } },

  { path: 'tools', children: [
    { path: '', component: ToolDashboardComponent },
    { path: 'score-generator', component: ScoreGeneratorComponent },
    { path: 'average-calculator', component: AverageCalculatorComponent },
  ], canActivate: [AuthGuard], data: { authGuardPipe: redirectUnauthorized } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
