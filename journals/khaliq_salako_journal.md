## 2/10

we worked more on our API endpoints, i think we are just about done with it really, seems like smooth sailing so far, i think we might be able to complete it faily early

## 2/13

Today we worked on our docker compose file and our requirements file too, we are still stuck in either we choose mongodb or SQL, Riley recommended Mongo so we're leaning towards that

## 2/14

we are still working on our endpoints today but we were able to get authentication done! we can now assign a token to a user and view the token

## 2/15/2023

We just finished building our endpoint today! I was the one hands on today and it was very much fun having to debug and decode our endpoints. Most of our bugs have been cleaned and testing it seems so work so we will decide what to move in with tomorrow. It was fairly smooth sailing going through it as we understood how to communicate with the api fairly quickly.
Our main issue of the day was that some locations didn’t have a details so we had to figure out how to show the details as an empty string instead of not having a details field at all. We used the try and except function to fix that!

## 2/16

Today we created the function to create a list of event but it somehow broke our functionality to create a new user with authentication.

## 2/21

Back from break, ready to code, today we worked on creating a function to update a trip and delete a trip. It took us about 2-3 hours but we had a eureka moment and figured it out. We then just made a create,get, update and delete event in the same manner, it was very simple since we already did the same for trip so that was a breeze

## 2/22

We worked on our login page on the front end of our application, we were stuck on authentication because we could not grab the token from our backend, we should be able to talk that today and fix it properly, everything going forward should be a lot easier

## 2/23

we figured out authentication, it was only one line of code that was the problem. We started building out triplist and forms and etc today, im tasked with the trip list and forms while the other pair would work one the event list and form, so far so good

## 2/27

we figured out get to get all trips and how to permanently fixed the error 402 unauthorized. I figured out how to delete a trip and about making getting a single trip functional, so far it was not too hard as I had Braden as a second opinion while working on it. Getting a single trip seems to be difficult because we can not seem to pull a single drop from our database and make a link to get that single trip, should be able to solve it tomorrow

## 2/28

we have fixed single trip AND edit trip AND the same for events, we even created a conditional rendering for our trip list, we got a lot done today, tomorrow we’re going start working on dates and styles and how we can put that together

## 3/1

we got a lot done today, we have mostly finished everything on the backend and everything works as intended! Perfect timing too since it’s a new month, we will start designing tomorrow. UPDATE: ERROR! our map doesn’t work on first render it only works when we refresh, an idea we have is that the problem is from the use effect function but not exactly sure exactly what needs to be changed, I will read some more documentation on my free time tonight

## 3/2

So far I have fixed the rendering issue, it’s because the map loaded before the data was retrieved, I fixed that by adding a isEventLoaded hook function that I just create to make sure the map does not load until the event data is Loaded. We’re now working on the front end on fill focus now

## 3/3

Working on the front end has been smooth sailing, we decided to use we have completed the sidebar easily and worked on the moduls in the login page, we had a small delay rendering issue to which our map loaded before the data came in so it always brought up a blank page but we figured it out

## 3/6

Anri and I worked on the itinerary page today, we mostly did the basics down and will work on formatting the positions of our stuff tomorrow, there we not many complications except the fact that we could not get our itinerary page to show the trip name through using the useLocation state, Riley told us that we neee to just get the trip name using a separate API call and we will implement that the next day, it’s pretty straightforward

## 3/7

We have basically completed most of our goals today! I finished working on the frontend of the Event details page and itinerary page with extra fixes based on feedback from my peers, Braden and Louis finished the forms on their end so we’ve progressed a lot today.

## 3/8

Small additions today that are not hard. We could not figure out the Prop key error, Riley said he’s give us a pass on that one cause it seems like a weird error, today I added titles and conditional render for when the user is logged in to say “Where to next, {name}?”. Pretty straightforward day as it’s just thinking of what small changes and what small designs we want to add

## 3/9

Got a lot done today, we cleaned up our readme file, changed and edited the fonts of all our pages, finally made our trip card perfectly formatted, cleaned up our errors and our unused imports. I also added a conditional render as to which the dates would not submit if the end date is before the start date because that it not a valid entry, seems like we are pretty much done on our end and is ready for presentation, there were not that many complications
