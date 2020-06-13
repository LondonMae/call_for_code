var mind = 100;
var body = 100;
var soul = 100;
var idealFreeTime = 2.5;
var idealSleep = 8;
var idealExercise = 5;
var totalExercise = 0;

var currentSchedule = [ false, false, false, false, false, false, "wakeup", "breakfast", "run", "yoga", "code", "lunch", "dogs", "movies", "movies", "movies", "dinner", "tv",
"read", "videogames", "videogames", "sleep" ];

var obligations = [ true, true, false, false, true, true, true, false, false, false, true, false, true, false, false, true ];
//basically data holder
class Schedule {
  constructor(scheduleData, obligations, likesSleep, morningPerson, likesJob, mood, favoriteThings, dislikes, exercise, interaction) {
    this.wakeup = (scheduleData.indexOf("wakeup") + 1);
    this.bedtime = (scheduleData.indexOf("sleep") + 1);
    this.scheduleData = scheduleData;
    this.obligations = obligations;
    this.sleepApproval = likesSleep;
    this.morningPerson = morningPerson;
    this.likesJob = likesJob;
    this.mood = mood;
    this.favoriteThings = favoriteThings;
    this.dislikes = dislikes;
    this.exercise = exercise;
    this.interaction = interaction;
    this.freeTime = 0;
    this.sleep = (24 - this.bedtime) + this.wakeup;
  }

  amountOfFreeTime() {
    for (var i = 0; i < obligations.length; i++) {
      if(!obligations[i]) { freeTime += 1; }
    }
  }

  calcIdealness() {
    var timeDiff = Math.abs(idealFreeTime-this.freeTime);
    mind -= (timeDiff*10);
    body -= (timeDiff*5);
    soul -= (timeDiff*5);

    var sleepDiff = Math.abs(this.sleep - idealSleep);
    mind -= (sleepDiff*7);
    body -= (sleepDiff*7);

    totalExercise += this.exercise;

    if (!this.likesJob) {
      mind -= 10;
      soul -= 30;
    }

      soul -= this.mood/5;


  }




  get idealness(){

  }

  addMind() {

  }

  addBody(){

  }

  addSoul(){

  }


  get newSchedule(){

  }

}

//current user schedule
var mySchedule = new Schedule(currentSchedule, obligations, false, true, true, 30, "horses", "drinking", 1, true);

mySchedule.calcIdealness();
console.log(mind + " " + body + " " + soul);//compute maximum mind body soul based on obligations

//data for questions
