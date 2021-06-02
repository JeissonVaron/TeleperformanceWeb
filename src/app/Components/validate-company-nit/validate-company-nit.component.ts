import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Interfaces/Company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointService } from 'src/app/Services/endpoint/endpoint.service';
import { NavigationExtras, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-validate-company-nit',
  templateUrl: './validate-company-nit.component.html',
  styleUrls: ['./validate-company-nit.component.css'],
})
export class ValidateCompanyNitComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private endpointService: EndpointService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      nit: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  getCompany(nit: string) {
    this.loading = true;
    this.endpointService.get(`Companies/${nit}`)
    .pipe(finalize(() => {
      this.loading = false;
    }))
    .subscribe(
      (data: Company) => {
        if (data && data.status) {
          const navigationExtras: NavigationExtras = {
            state: {
              company: data,
            },
          };
          this.router.navigateByUrl('/register', navigationExtras);
        } else {
          Swal.fire('Oops...', 'Actualmente no puedes registrarte con el NIT de esta empresa', 'error');
        }
      },
      () => {
        Swal.fire('Oops...', "Ha ocurrido un error inesperado", 'error');
      }
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      for (const prop in this.form.controls) {
        this.form.controls[prop].markAsTouched();
      }
      return;
    }
    this.getCompany(this.f.nit.value);
  }
}
