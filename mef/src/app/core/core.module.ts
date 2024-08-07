import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { HttpErrorInterceptorService } from '../services/httperror-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    AlertifyService,
    AuthService,
    DatePipe,
    DecimalPipe,
  ],
  exports: [FormsModule, ReactiveFormsModule],
})
export class CoreModule {}
