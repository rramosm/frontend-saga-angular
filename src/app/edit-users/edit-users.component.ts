import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  usersForm: FormGroup;  
  userId = '';
  projectId = null;
  name = '';
  surname = '';
  documentTypeEnum = '';
  documentNumber = '';
  docTypeList = ['DNI', 'CARNET_EXTRANJERIA', 'RUC', 'PASAPORTE']
  active = null;
  projectList = [1, 2, 3];
  activeList = [true, false];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsersById(this.route.snapshot.params.userId);
    this.usersForm = this.formBuilder.group({
	    projectId : [null, Validators.required],
      name : [null, Validators.required],
      surname : [null, Validators.required],
      documentTypeEnum : [null, Validators.required],
      documentNumber : [null, Validators.required],      
      active : [null, Validators.required]
    });
  }

  getUsersById(userId: any) {
    this.api.getUsersById(userId).subscribe((data: any) => {
      this.userId = data.userId;
      this.usersForm.setValue({
		    projectId: data.projectId,  
        name: data.name,
        surname: data.surname,
        documentTypeEnum: data.documentTypeEnum,
        documentNumber: data.documentNumber,
        active: data.active
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateUsers(this.userId, this.usersForm.value)
      .subscribe((res: any) => {
          const userId = this.userId;
          this.isLoadingResults = false;
          this.router.navigate(['/users-details', userId]);
        }, (err: any) => {
          this.toastr.error("Error in operation.")
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  usersDetails() {
    this.router.navigate(['/users-details', this.userId]);
  }

}
