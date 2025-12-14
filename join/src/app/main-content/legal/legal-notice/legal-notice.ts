import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {
  constructor(private location: Location, public authService: AuthService) {}

  goBack() {
    this.location.back();
  }
}
