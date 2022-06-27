import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PasswordRecoveryComponent } from './auth/password-recovery/password-recovery.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { StudentDashboardComponent } from './students/student-dashboard/student-dashboard.component';
import { SectionListComponent } from './sections/section-list/section-list.component';
import { SectionDetailComponent } from './sections/section-detail/section-detail.component';
import { SectionDashboardComponent } from './sections/section-dashboard/section-dashboard.component';
import { HomeComponent } from './site/home/home.component';
import { AboutComponent } from './site/about/about.component';
import { PricingComponent } from './site/pricing/pricing.component';
import { ContactComponent } from './site/contact/contact.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { SubjectDetailComponent } from './subjects/subject-detail/subject-detail.component';
import { SubjectDashboardComponent } from './subjects/subject-dashboard/subject-dashboard.component';
import { EmptyComponent } from './common/empty/empty.component';
import { SectionLevelPipe } from './section-level.pipe';
import { ScoreGeneratorComponent } from './tools/score-generator/score-generator.component';
import { ToolDashboardComponent } from './tools/tool-dashboard/tool-dashboard.component';
import { AverageCalculatorComponent } from './tools/average-calculator/average-calculator.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PasswordRecoveryComponent,
    UserProfileComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentDashboardComponent,
    SectionListComponent,
    SectionDetailComponent,
    SectionDashboardComponent,
    HomeComponent,
    AboutComponent,
    PricingComponent,
    ContactComponent,
    NavigationComponent,
    DashboardComponent,
    SubjectListComponent,
    SubjectDetailComponent,
    SubjectDashboardComponent,
    EmptyComponent,
    SectionLevelPipe,
    ScoreGeneratorComponent,
    ToolDashboardComponent,
    AverageCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
