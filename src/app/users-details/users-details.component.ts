import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Users } from '../users';
import { Projects } from '../projects';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

  users: Users = { userId: '', projectId: null, projectDesc: '', name: '', surname: '', documentTypeEnum : '', documentNumber: '', active: null};
  dataProjects: Projects[] = [];
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getProjects();
    this.getUsersDetails(this.route.snapshot.params.userId);
  }

  getUsersDetails(userId: string) {
    this.api.getUsersById(userId)
      .subscribe((data: any) => {
        this.users = data;
        this.putProjectDesc(); 
        console.log(this.users);
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

  putProjectDesc(): void {
    for (let projectData of this.dataProjects) {
      if (this.users.projectId == projectData.id) {
        this.users.projectDesc = projectData.name;
        break;
      }
    }
  }

  deleteUsers(userId: any) {
    this.isLoadingResults = true;
    this.api.deleteUsers(userId)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/users']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  setColor(active: string) {
    let color: string;
    if (active === 'Positive') {
      color = 'orange-color';
    } else if (active === 'Recovered') {
      color = 'green-color';
    } else {
      color = 'red-color';
    }

    return color;
  }

}
