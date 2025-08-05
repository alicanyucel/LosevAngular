import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FlexiButtonComponent } from 'flexi-button';
import { api } from '../../constanst/constants';
import { FlexiToastService } from 'flexi-toast';
import { lastValueFrom } from 'rxjs';
import { LoginResponseModel } from '../../models/login.reponse.model';

@Component({
  imports: [RouterLink, FormsModule, FlexiButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LoginComponent {
  readonly request = signal<{EmailOrUserName: string, Password: string}>({EmailOrUserName: "", Password: ""});
  readonly loading = signal<boolean>(false);

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);

  async login(){
    if(!this.loading()){
      this.loading.set(true);
      try {
        const res = await lastValueFrom(this.#http.post<LoginResponseModel>(`${api}/Auth/Login`,this.request()));
        
        if(res && res.data && res.data.token) {
          localStorage.setItem("accessToken", res.data.token);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          this.#router.navigateByUrl("/home");
          this.#toast.showToast("Başarılı!","Giriş başarılı","success");
        } else {
          this.#toast.showToast("Hata!","Sunucudan geçersiz yanıt","error");
        }
      } catch (error: any) {
        console.error('Login error:', error);
        let errorMessage = "Giriş bilgileri hatalı";
        
        if (error.status === 0) {
          errorMessage = "Sunucuya bağlanılamıyor";
        } else if (error.status === 401) {
          errorMessage = "Kullanıcı adı veya şifre hatalı";
        } else if (error.status === 404) {
          errorMessage = "API endpoint bulunamadı";
        } else if (error.status >= 500) {
          errorMessage = "Sunucu hatası";
        }
        
        this.#toast.showToast("Hata!", errorMessage, "error");
      } finally {
        this.loading.set(false);
      }
    }
  }
}