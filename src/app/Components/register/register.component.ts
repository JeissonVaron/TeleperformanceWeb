import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Interfaces/Company';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/Interfaces/RegisterUser';
import { EndpointService } from 'src/app/Services/endpoint/endpoint.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  company: Company;
  form: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private endpointService: EndpointService
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.company = this.router.getCurrentNavigation().extras.state.company;
      } else {
        this.router.navigateByUrl('/validate-company-nit');
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      identificationType: ['', Validators.required],
      identificationNumber: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      companyName: [''],
      firstName: [''],
      secondName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      firstLastname: [''],
      secondLastname: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      authorizeCellPhone: [false],
      authorizeEmail: [false],
    });

    this.f.identificationType.valueChanges.subscribe((value) => {
      if (value == 3 || value == 5) {
        this.f.companyName.setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
        ]);
        this.f.firstName.clearValidators();
        this.f.firstLastname.clearValidators();
        this.f.firstName.setValue('');
        this.f.secondName.setValue('');
        this.f.firstLastname.setValue('');
        this.f.secondLastname.setValue('');
      } else {
        this.f.firstName.setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
        ]);
        this.f.firstLastname.setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$'),
        ]);
        this.f.companyName.clearValidators();
        this.f.companyName.setValue('');
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      for (const prop in this.form.controls) {
        this.form.controls[prop].markAsTouched();
      }
      return;
    }

    const registerUser: RegisterUser = {
      IdentificationType: this.f.identificationType.value,
      IdentificationNumber: this.f.identificationNumber.value,
      CompanyName: this.f.companyName.value,
      FirstName: this.f.firstName.value,
      SecondName: this.f.secondName.value,
      FirstLastname: this.f.firstLastname.value,
      SecondLastname: this.f.secondLastname.value,
      Email: this.f.email.value,
      AuthorizationToSendMobileMessages: this.f.authorizeCellPhone.value,
      AuthorizationToSendEmailMessages: this.f.authorizeEmail.value,
    };

    this.endpointService.post('Users', registerUser).subscribe(() => {
      Swal.fire('Registro exitoso');
      this.router.navigateByUrl('/validate-company-nit');
    }, e => {
      Swal.fire('Oops...', e.error, 'error');
    });
  }
}
