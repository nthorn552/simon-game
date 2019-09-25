  The rules are simple: (please refer to the animated gif)

  After the initial page load, you will see:
  1. four small boxes, each with a different color
  2. one big box with no colors showing

  As soon as the page loads, the game starts:
  1. In the big box, there will be a sequence of 4 colors that flash
  2. the player will try to click on the small colored boxes in the same sequence as they flashed in the big box
  3. if the sequence is the same as the sequence that flashed in the big box, a win result will show up; otherwise, a loss result will show up

  Additional features to consider:
  1. start button
  2. animation when the player clicks on the box
  3. scores
  4. difficulty level for the game (start with 4, 5, 6...)

  Initial thoughts:
  <Simon>, component with state for the game
    <Lead> takes sequence from Simon, sets state to let game know when it is players turn
    <Follow> takes state prop to know when to allow user interaction.  Outputs user selection as clicked.
      <FollowButton> 4 of these, each assigned a color, to report to Follow when clicked
    <StartButton> user control to tell Simon to generate a sequence.  For v1, this can be triggered on Simon mount, but such a simple add (and easier for testing) I would like it off the bat.
    <Difficulty> select component allowing user to change difficulty.  Updates on change to Simon, for use when user clicks StartButton.  V2.
    <Score> V2.  Simon will have this data already, just needs to pass prop to this component for display.
  </Simon>

Once I started setting props, realized I was still thinking in Redux.  Without a store available, breaking out new components is not always more convenient (for me)

Realized the FollowButton was really just a color display, and could be reused for Lead if it understood when it was "clickable"
Lead component removed, App will just show a FollowButton (now called StepBox) with the color for each step when it shows the pattern

Ideally, would have a state that disabled the Follow component when the game is showing the sequence.  Could be accomplished by hiding the controls, passing Follow the gameState, or others, but for the sake of time I'm going to just leave it on all the time.

Follow component that doesn't disable during the "leading" state is really not very helpful, so I'm just moving that into the App.js
Ideally might have components for managing some of the functionality that is currently in App.js, but it felt like clutter passing so many state props and callbacks

Difficulty is an easy add, but doesn't actually need to be managed by App, so I'm splitting of a component to house all the settings/scores.  It can call out to start a new game, and can take in a score, all else can be self-managed.

Added some simple styling.  And gifs, at the requent of my fiance when I showed this to her.

Known issue: would want to separate the lead steps with a blank color to make adjacent steps of the same color less confusing.  Would also hide or disable the user controls when leading the sequence so the user can't just put the sequence in as it is shown.
