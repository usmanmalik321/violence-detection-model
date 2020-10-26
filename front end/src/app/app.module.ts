import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { AuthInterceptor } from './authconfig.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import {
  MatSidenavModule,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { DatabaseComponent } from './database/database.component';
import { MatVideoModule } from 'mat-video';
import { CameraComponent } from './camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { SheetComponent } from './sheet/sheet.component';
import { SignupComponent } from './signup/signup.component';
import { ProfilecardComponent } from './profilecard/profilecard.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    LoginComponent,
    AdminComponent,
    SidenavComponent,
    DatabaseComponent,
    CameraComponent,
    SheetComponent,
    SignupComponent,
    ProfilecardComponent,
    SearchbarComponent,
  ],
  imports: [
    MatDividerModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    WebcamModule,
    MatVideoModule,
    HttpClientModule,
    MatListModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  entryComponents: [SheetComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    LoginComponent,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
