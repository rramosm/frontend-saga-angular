import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { Projects } from '../projects';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  usersForm: FormGroup;
  projectId = null;
  name = '';
  surname = '';
  documentTypeEnum = '';
  documentNumber = '';
  docTypeList = ['DNI', 'CARNET_EXTRANJERIA', 'RUC', 'PASAPORTE']
  active = null;
  activeList = [true, false];
  projectList = [1, 2, 3];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  dataProjects: Projects[] = [];

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProjects();
    this.usersForm = this.formBuilder.group({
      projectId : [null, Validators.required],      
      name : [null, Validators.required],
      surname : [null, Validators.required],
      documentTypeEnum : [null, Validators.required],
      documentNumber : [null, Validators.required],
      active : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addUsers(this.usersForm.value)
      .subscribe((res: any) => {
          const userId = res.userId;
          this.isLoadingResults = false;
          this.router.navigate(['/users-details', userId]);
        }, (err: any) => {
          this.toastr.error("Error in operation.")
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getProjects(): void {
    this.api.getProjects()
    .subscribe((res: any) => {
      this.dataProjects = res.projects;
      console.log(this.dataProjects);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
