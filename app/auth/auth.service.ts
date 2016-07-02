/* ===== ./auth.service.ts ===== */
import { Injectable} from '@angular/core';
import { tokenNotExpired} from 'angular2-jwt';
import { User,UserService} from '../User/shared/index'

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
   
  // Configure Auth0
  lock = new Auth0Lock('6f9yAi8y599PadQBQO6sd4OV3RVTk15c', 'jjaspe.auth0.com', {
      callbackUrl:"http://localhost:3000/"
  });
  userProfile: Object;

  constructor(private userService:UserService) {
      // Set userProfile attribute if already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      
      localStorage.setItem('id_token', authResult.idToken);
      
       // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }else{
            this.userService.signUpUser(profile.Name,profile.email)
            this.userService.setLoggedInUser(profile.email)
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        localStorage.setItem('username',profile.email);
        this.userProfile = profile;
      });
    });
  }

  public tryPreviouslyLoggedIn(){      
    if(this.userProfile){
        let username=localStorage.getItem('username');
        this.userService.setLoggedInUser(username)
    }
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
    this.userService.clearLoggedInUser()
  };
}