import { Observable } from 'rxjs';

// we might have noticed that we provide an Observer object to the subscribe method, but in the function with the Observable's logic, we have a subscriber object instead.
// This is because when we subscribe, our Observer gets wrapped into a subscriber object and this is done to provide some of the Observable interface guarantees, like not delivering notifications after the Subscription gets closed or providing default handlers for the notification types which are not covered by our Observer.
// To put it in a simple way, it's a transparent step which makes the Observables more predictable and easier to use. And that's done automatically by RxJS, so we don't need to worry about that step.
const observable$ = new Observable<string>((subscriber) => {
  console.log('observable executed!');
  subscriber.next('Mahathi');
  // subscriber.next('Chenchu Lakshmi');
  // subscriber.next('Mahi Chenchith');
  setTimeout(() => subscriber.next('Chenchu Lakshmi'), 2000);

  // As a side note, we shouldn't leave any code running like this after we unsubscribe. We should probably cancel the remaining setTimeouts after unsubscribing, so as not to risk any unwanted side effects or memory leaks, but we'll touch this topic later in the course.
  setTimeout(() => subscriber.next('Mahi Chenchith'), 4000);
});

// We react to the values by emitted by observable by providing the Observer.
const observer = {
  // Next notification handler or data handler
  next: (data) => {
    console.log(data);
  },
};

// with old syntax and it's shorthand way of passing next notification handler. So, if we have only next notification handler, then it's the less complicated and more readable syntax.
// observable$.subscribe((data) => {
// Next notification handler or data handler
//   console.log(data);
// });

// with new syntax from rxjs >=7
const subscription = observable$.subscribe(observer);

// If we are no longer interested in receiving values from the Observable, we should unsubscribe.
// In our current case, unsubscribing wouldn't cause any spectacular effect as all three values are emitted immediately after subscribing. To better see the unsubscribing in action, let's modify our Observable a bit and spread the values in time by using 'setTimeout'.
setTimeout(() => {
  // In our example, the Subscription gets closed before the third next notification gets emitted. so it's not passed to the Observer.
  console.log('Unsubscribe');
  subscription.unsubscribe();
}, 3000);
