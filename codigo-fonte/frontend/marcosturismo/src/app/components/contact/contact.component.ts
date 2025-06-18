import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      mensagem: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  enviarParaWhatsApp() {
    if (this.form.invalid) return;

    const { nome, telefone, mensagem } = this.form.value;
    const texto = `Olá! Me chamo *${nome}*, meu telefone é *${telefone}* e gostaria de falar o seguinte:\n\n${mensagem}`;
    const url = `https://wa.me/${environment.phoneMarcos}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }
}
