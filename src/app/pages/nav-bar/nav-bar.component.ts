import {Component} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  navbg: any;

  /* @HostListener('document: scroll') scrollover(){
     console.log(document.body.scrollTop,'scrolllength#');
      if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        this.navbg={
          'background-color':'rgba(0,0,0,0.5)',
          'backdrop-filter': 'blur(6px)'
        }

      } else {
        this.navbg = {

        }

      }
   }
 */
}
