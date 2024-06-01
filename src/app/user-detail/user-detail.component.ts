import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatButtonModule, MatMenu, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'] // Korrigiert: `styleUrl` zu `styleUrls` und als Array
})

export class UserDetailComponent {
  userId: any = '';
  firestore: Firestore = inject(Firestore);
  user: User = new User();  


  constructor(private route: 
    ActivatedRoute, 
    public dialog: MatDialog) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log(this.userId);
      this.getUser();
    });
  }

  getUser() {
    const userDocRef = doc(collection(this.firestore, 'users'), this.userId);
    docData(userDocRef).subscribe((user: any) => {
      this.user = new User(user);
      console.log('Retrived user', user)
    });
  }
  editMenu(){ 
   const dialog =  this.dialog.open(DialogEditAdressComponent); 
   dialog.componentInstance.user = new User(this.user.toJSON); 
   dialog.componentInstance.userId = this.userId; 
  }
  editUserDetail(){ 
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON); 
    dialog.componentInstance.userId = this.userId; 
  }
}
