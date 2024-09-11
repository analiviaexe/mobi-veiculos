import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SessaoService } from 'src/app/services/sessao/sessao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule, ReactiveFormsModule ],
})
export class LoginComponent implements OnInit {

  typeInput = 'password';

  formGroup: FormGroup = new FormGroup({
    username: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
    }),
    password: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),
      ],
    }),
  });

  constructor(private route: Router, private sessaoService: SessaoService ) { }

  ngOnInit() {
  }

  redirecionaHome() {
    if (this.formGroup.invalid) {
      this.formGroup.reset();
      return;
    } else {
      this.formGroup.get('')?.errors
      this.sessaoService.salvarSessao(this.formGroup.value);
      this.route.navigate(['home'])
    }
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }
}
