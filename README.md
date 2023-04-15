# Title

*Amittai, BuzzFeed Quiz*

> **Note**
>
> I got into the class late (end of week 2), and the prof said he would
> give me time to catch up with the assignments that had alredy
> happened.
> Consequently, I submitted this assignment a day late.


This program simulates a BuzzFeed quiz to recommend which dystopian world
is ideal for the user.

[deployed url](https://quizzical-8tlk.onrender.com/)

## What Worked Well

Most of the Javascript stuff was straightforward.
CSS was a bit tricky especially re. trying to avoid dead code.


## What Didn't

Nothing really.  

## Extra Credit

I did both the CSS focus and the Javascript focus.

> **_Why include the Javascript file(s) at the end of the body?_**
>
> I'm guessing the browser loads page content sequentially.
> Since Javascript bundle code can be substantial, loading the Javascript file
> can take significant time.
>
> HOwever, in some cases the JS is not _needed_ for the initial render of the 
> page! Therefore, including the JS at the end of the body allows the browser
> to load most page content first, then load the JS in the background.
>
> This gives the impression that the page loads faster.
>
> On the other hand, if the initial render depends on data, etc. that is
> loaded by the Javascript code, does it still help to include the JS file
> at the end of the body?

### On the CSS Side

- On the CSS side, I added animations/transitions for the
  different states (hover, selected, etc.)
- I also added an animated progress-bar that shows one's progress in the quiz.
- I also added a "reset" button and a semi-transparent overlay for the
  "quiz complete" message that closes the message when clicked,
  thus simulating the "clicking outside the modal to dismiss it" behavior.
- I also made the sire responsive to different screen sizes.

### On the Javascript Side

- I implemented the described API in the assignment and used Javascript
  to parse JSON and populate the DOM.

- I also tried weighting the prompts differently based on how "relevant"
  I found each to be (how "representative" it was of the movie).
  Each prompt has a `weight` property and whoever wins the round
  takes the score (higher than or lower than average).

## Screenshots


### Hover State

![Hover State](assets/images/hover.png)

### Selected State

![Selected State](assets/images/selected.png)

### Progress Bar

![Progress Bar](assets/images/progress-bar.png)

### Quiz Complete

![Quiz Complete](assets/images/quiz-complete.png)
