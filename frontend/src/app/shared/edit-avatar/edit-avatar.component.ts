// src/app/shared/edit-avatar/edit-avatar.component.ts
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { AvatarService } from 'src/app/services/avatar.service';
import { updateUserAvatar } from 'src/app/store/actions/user.actions';
import { selectUser } from 'src/app/store/selectors/auth.selector';
import { selectUserAvatarError } from 'src/app/store/selectors/user.selector';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    HeaderComponent,
  ],
})
export class EditAvatarComponent implements OnInit {
  avatars: any[] = [];
  selectedAvatarId: number | null = null;
  userId: number | undefined;

  constructor(
    private avatarService: AvatarService,
    private store: Store<AppState>,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {
    this.store.pipe(select(selectUser)).subscribe({
      next: (user) => {
        this.userId = user?.id;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      },
    });
  }

  ngOnInit(): void {
    this.avatarService.getAvatars().subscribe({
      next: (avatars) => {
        this.avatars = avatars;
        console.log(this.avatars);
        this.cd.detectChanges(); // Force Angular to recognize the update
      },
      error: (error) => {
        console.error('Failed to load avatars:', error);
      },
    });

    this.store
      .select(selectUserAvatarError)
      .pipe(filter((error) => error !== null))
      .subscribe((error) => {
        this.presentToast('Error updating avatar: ' + error.message); // Assurez-vous que le message d'erreur est adapté
      });
  }

  selectAvatar(avatar: any) {
    this.selectedAvatarId = avatar.id;
    this.store.dispatch(updateUserAvatar({ avatarName: avatar.name }));
    // Ferme la modale après la sélection
    this.modalCtrl.dismiss();
    this.cd.detectChanges();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
