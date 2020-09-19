import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {IOption, LIST_DATA} from "../list-options/list-options.component";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.styl']
})
export class BannerComponent implements OnInit {
  private listOptions = LIST_DATA;
  lang: string | 'en' | 'ps' | 'prs';
  urlSegmentOptions: IOption[] = [];

  constructor(private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.createBreadcrumb(this.location.path());
      this.lang = localStorage.getItem('lang');
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      this.createBreadcrumb(event.urlAfterRedirects)
    });
  }

  createBreadcrumb(urlString: string) {
    this.urlSegmentOptions = [];
    const removedQuerySectionUrlArray = urlString.split('?')
    const urlArray = removedQuerySectionUrlArray[0].split('/')
    for (let i = 2; i < urlArray.length; i++) {
      this.listOptions.forEach(option => {
        if (urlArray[i] === option.urlSegment) {
          this.urlSegmentOptions.push(option)
        }
        if (option && option.children) {
          option.children.forEach(childOption => {
            if (urlArray[i] === childOption.urlSegment) {
              const temp = Object.create(childOption);
              temp.urlSegment = option.urlSegment + '/' + childOption.urlSegment
              this.urlSegmentOptions.push(temp)
            }
          })
        }
      })
    }

  }

}
