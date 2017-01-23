function test(){

  let movie1 = new movie("The godfather", 1972, 178);
  let movie2 = new movie("Terminator", 1984, 108);
  let movie3 = new movie("Casablanca", 1942, 102);

  let logger1 = new logger();
  let logger2 = new logger();

  movie1.on("play", logger1.log);
  movie2.on("resume", logger2.log);
  movie3.on("pause", logger1.log);

  movie1.play();
  movie2.resume();
  movie3.play();

  movie2.off("resume", logger2.log);


  movie1.play();
  movie2.resume();
  movie3.pause();


  movie1 = Object.assign(movie1, social);
  movie1.likes("Agustin");
  movie1.share("Martin");

  let pacino = new actor("Al Pacino", 76);
  let otherCast = [
    new actor("Marlon Brando", 80),
    new actor("Robert Duvall", 86),
    new actor("James Caan", 76),
  ]

  movie1.addCast(pacino);
  movie1.addCast(otherCast);

}