import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {
  constructor(private location: Location, public authService: AuthService) {}

  goBack() {
    this.location.back();
  }
}
