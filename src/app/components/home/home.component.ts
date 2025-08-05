import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule]
})
export class HomeComponent {
  username = 'Test';

  groups = [
    {
      name: 'Masastü',
      passwords: [
        { name: 'Sql SA', url: '123456', password: '123456', show: false }
      ]
    },
    {
      name: 'Web',
      passwords: [
        { name: '', url: '', password: '', show: false }
      ]
    },
    {
      name: 'Games',
      passwords: [
        { name: 'Barbie Giydirmece', url: 'www.kraloyun.com/barbiegiydirmece', password: 'Barbi123*', show: false }
      ]
    }
  ];

  toggleShow(pass: any) {
    pass.show = !pass.show;
  }

  createNewGroup() {
    const groupName = prompt('Enter group name');
    if (groupName) {
      this.groups.push({ name: groupName, passwords: [] });
    }
  }

  addPass(group: any) {
    const passName = prompt('Enter pass name');
    const url = prompt('Enter url');
    const password = prompt('Enter password');
    if (passName && url && password) {
      group.passwords.push({ name: passName, url, password, show: false });
    }
  }

  editPass(pass: any) {
    const newName = prompt('Edit pass name', pass.name);
    const newUrl = prompt('Edit url', pass.url);
    const newPassword = prompt('Edit password', pass.password);
    if (newName !== null && newUrl !== null && newPassword !== null) {
      pass.name = newName;
      pass.url = newUrl;
      pass.password = newPassword;
    }
  }

  deletePass(group: any, pass: any) {
    const index = group.passwords.indexOf(pass);
    if (index !== -1) {
      group.passwords.splice(index, 1);
    }
  }
}
