import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FlexiButtonComponent } from 'flexi-button';
import { FlexiToastService } from 'flexi-toast';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { HttpService } from '../../services/http.service';
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
  readonly showPassword = signal<boolean>(false);

  readonly #http = inject(HttpService);
  readonly #router = inject(Router);
  readonly #toast = inject(FlexiToastService);
  readonly #sweetAlert = inject(SweetAlertService);

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  login(){
    if(!this.loading()){
      this.loading.set(true);
      
      this.#http.post<LoginResponseModel>(
        'Auth/Login',
        this.request(),
        (res: LoginResponseModel) => {
          if(res && res.token) {
            localStorage.setItem("token", res.token);
            localStorage.setItem("refreshToken", res.refreshToken);
            
            // Toast notification göster ve sonra yönlendir
            this.#sweetAlert.toast("Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...", "success");
            
            // 1.5 saniye sonra ana sayfaya yönlendir
            setTimeout(() => {
              this.#router.navigateByUrl("/home");
            }, 1500);
            
          } else {
            this.#sweetAlert.error("Hata!", "Sunucudan geçersiz yanıt alındı");
          }
          this.loading.set(false);
        },
        () => {
          this.loading.set(false);
        }
      );
    }
  }
}