import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Users } from '../users';
import { Projects } from '../projects';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['userId', 'projectDesc', 'name', 'surname', 'documentTypeEnum', 'documentNumber', 'active'];
  data: Users[] = [];
  dataProjects: Projects[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getProjects()
    .subscribe((res: any) => {
      this.dataProjects = res.projects;
      console.log(this.dataProjects);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
    
    this.api.getUsers()
    .subscribe((res: any) => {
      this.data = res;
      this.putProjectDesc(); 
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });    
  }

  putProjectDesc(): void {
    for (let userData of this.data) {
      for (let projectData of this.dataProjects) {
        if (userData.projectId == projectData.id) {
          userData.projectDesc = projectData.name;
          break;
        }
      }
    }
  }
}
