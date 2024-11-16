import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProvidersService } from 'src/app/services/providers.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit{
  providerForm: FormGroup;
  cif: string = '';
  formSubmitted = false;

  constructor(
    private providersService: ProvidersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.providerForm = new FormGroup({
      cif: new FormControl('', Validators.required),
      name: new FormControl(''),
      activity: new FormControl(''),
      address: new FormControl(''),
      city: new FormControl(''),
      cp: new FormControl(''),
      phone: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.cif = this.route.snapshot.paramMap.get('cif') || '';

    this.providersService.getProviderByCif(this.cif).subscribe((data: any) => {
      this.providerForm.patchValue(data.provider);
    });
  }

  sendForm(): void {
    this.formSubmitted = true;

    if (this.providerForm.invalid) {
      return ;
    }
    
    this.providersService.updateProvider(this.cif, this.providerForm.value).subscribe(() => {
      this.router.navigate(['/providers']);
    });
  }
}
