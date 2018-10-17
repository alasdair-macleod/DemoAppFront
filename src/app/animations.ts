import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const routeSlideAnimation =
  trigger('routeSlide', [
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '{{offsetLeave}}%'})
      ]),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('450ms ease-out', style({ left: '{{offsetEnter}}%'}))
        ], {optional: true}),
        query(':enter', [
          animate('450ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);