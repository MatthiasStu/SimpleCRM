import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { Firestore, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';



@Component({
  selector: 'app-dialog-edit-adress',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule, 
    MatProgressBarModule, 
    NgIf
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  loading:boolean = false; 
  user!: User; 
  birthDate: Date = new Date();
  userId!:string; 
  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){ 
  
  }
  
  saveUser() {
    this.loading = true; 
    const userObj = this.user.toJSON();
    const sanitizedUserObj = Object.fromEntries(
      Object.entries(userObj).filter(([_, v]) => v !== undefined)
    );
    const userDocRef = doc(this.firestore, "users", this.userId);
    updateDoc(userDocRef, sanitizedUserObj)
      .then(() => {
        this.loading = false; 
      });
  }
}


