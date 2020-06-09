var mind;
var body;
var soul;

var currentSchedule = {
  one: false, two: false, three: false, four: false, five: false, six: false, seven: "wakeup", eight: "breakfast", nine: "run", ten: "yoga", eleven: "code", twelve: "lunch",
thirteen: "dogs", fourteen: "movies", fifteen: "movies", sixteen: "movies", seventeen: "dinner", eighteen: "tv", nineteen: "read", twenty: "videogames", twentyone: "videogames",
twentytwo: "sleep", twentythree: false, twentyfour: false, oneNight: false, twoNight: false, threeNight: false, fourNight: false
};

var obligations = [ true, true, false, false, true, true, false, false, false, false, true, false, false, false, false, true ];
//basically data holder
class Schedule {
  constructor(scheduleData, obligations, likesSleep, morningPerson, likesJob, missingSomething, coronaImpact, feelingOfSchedule, favoriteThings, dislikes) {
    this.wakeup = scheduleData[(indexOf["wakeup"] + 1)];
    this.bedtime = scheduleData[(indexOf["sleep"] + 1)];
    this.scheduleData = scheduleData;
    this.obligations = obligations;
    this.sleepApproval = likesSleep;
    this.morningPerson = morningPerson;
    this.likesJob = likesJob;
    this.missingSomething = missingSomething;
    this.coronaImpact = coronaImpact;
    this.feelingOfSchedule = feelingOfSchedule;
  }

  calcIdealness() {
    //if answers are sad - points from all categories
    //not enough sleep = subtract from mind and body
    //too many obligations = subtract from call
    //low engagment for hobbies = subtract from all
    //no exercize = minus for body
    //nothing educational = minus for mind
    //no family or friends = minus for soul
  }

  get idealness(){

  }

  addMind() {

  }

  addBody(){

  }

  addSoul(){

  }

  createSchedule() {

  }

  get newSchedule(){

  }

}

//current user schedule
var mySchedule = new Schedule(currentSchedule, obligations, false, true, true, false, true, "content");
//compute maximum mind body soul based on obligations

//data for questions
var questions = {
  q1 = "a1";
}
