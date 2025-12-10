import { Injectable, inject } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Account } from '../../../interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = true;

  firestore: Firestore = inject(Firestore);
  private unsubscribe;
  private accountList : Account[] = [];
  constructor() {
    this.unsubscribe = onSnapshot(collection(this.firestore, "accounts"), (accountsSnapshot) => {
      this.accountList = [];
      accountsSnapshot.forEach((account) => {
        this.accountList.push(this.setAccountObject(account.id, account.data() as Account));
        console.log(account.data());
      });
    });
  }

  ngOnDestroy() {
      if(this.unsubscribe) {
      this.unsubscribe();
    }
  }

  login(): void {

    // Hier würde normalerweise die tatsächliche Authentifizierungslogik stehen
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setAccountObject(idPram: string, obj: Account): Account {
    return {
      email: obj.email,
      id: idPram,
      isLoggedIn: obj.isLoggedIn,
      password: obj.password,
    }
  }

}
